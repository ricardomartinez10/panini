import react from 'react';

import soccerService from '../services/soccer.service';
import TeamLine from './teamLine';
import BasicModal from './basicModal';
import { ref, onValue } from 'firebase/database';

class MainComponent extends react.Component {
    constructor() {
        super();
        this.state = { 
            data: [],
            openModal: false,
            playerData: {},
            repeatedPlayers: [],
            collectedTotal: 0
        }
        this.service = new soccerService();
        //this.service.addGems();
        //this.service.addTeams();
    };

    componentDidMount() {
        const query = this.service.getQuery();
        onValue(query, (snapshot) => {
            const response = snapshot.val();
            const teams = Object.values(response);
            this.setState({
                data: teams
            });
            if (teams) {
                this.getRepeatedplayers(teams);
            }
        });
    };

    handleClick = (event, data) => {
        this.setState({
            openModal: true,
            playerData: data
        })
      };

    closeModal = (event, data) => {
        this.setState({
            openModal: false
        })
    };

    renderTeamLines() {
        const listItems = this.state.data.map((team) =>
            <TeamLine key={team.name.toString()} team={team} handleClick={this.handleClick} ></TeamLine>
      );
        return (
            <div>{listItems}</div>
        )
    }

    getRepeatedplayers = (teams) => {
        var players = [];
        var collectedPlayers = 0;
        const repeated = [];

        
        teams.forEach(team => {
            const squad = {
                players: []
            };
            players = Object.values(team);
            players.forEach((player) => {
                if (player.repeated) {
                    squad.name = player.team;
                    squad.players.push(player);
                }

                if (player.collected) {
                    collectedPlayers++;
                }
            });

            if (squad.hasOwnProperty('name')){
                repeated.push(squad);
            }
        });
        

        this.setState({
            repeatedPlayers: repeated,
            collectedTotal: collectedPlayers
        });
    }

    render() {
        return(
            <div className='main-container'>
                <h1>Láminas mundial 2022</h1>
                <BasicModal openModal={this.state.openModal} closeModal={this.closeModal} playerData={this.state.playerData}></BasicModal>
                {this.state.data.length ? this.renderTeamLines(): (
                    <p>Loading</p>
                )}
                <hr></hr>
                <div>
                    <h2>Láminas repetidas</h2>
                    <div>
                        {this.state.repeatedPlayers.map((team, index) => 
                        <div key={index.toString()} className=''>
                            <p className='player-repeated-txt'>
                                {team.name}:&nbsp; {team.players.map((player, index) => <span key={player.key}>{player.key} 
                                    {index + 1 < team.players.length ? <span>&nbsp;-&nbsp;</span> : null}</span>)}
                            </p>
                        </div>)}
                    </div>
                </div>
                <div>
                    <p>Total coleccionadas: {this.state.collectedTotal}</p>
                </div>
            </div>
        )
    }
}

export default MainComponent;