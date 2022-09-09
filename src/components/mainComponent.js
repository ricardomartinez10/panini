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
            repeatedPlayers: []
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
        const repeated = [];
        var players = [];

        teams.forEach(team => {
            players = Object.values(team);
            players.forEach((player) => {
                if (player.repeated) {
                    repeated.push(player);
                }
            })
        });

        const tiiles = repeated.map((player) => {
            return player.team + player.key;
        });

        this.setState({
            repeatedPlayers: tiiles
        });
    }

    render() {
        return(
            <div className='main-container'>
                <h1>Laminas mundial 2022</h1>
                <BasicModal openModal={this.state.openModal} closeModal={this.closeModal} playerData={this.state.playerData}></BasicModal>
                {this.state.data.length ? this.renderTeamLines(): (
                    <p>Loading</p>
                )}
                <hr></hr>
                <div>
                    <h2>Laminas repetidas</h2>
                    <div>
                        {this.state.repeatedPlayers.map(player => <div className='player-repeated-txt-container'><p className='player-repeated-txt'>{player}</p><span>&nbsp;-&nbsp;</span></div>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default MainComponent;