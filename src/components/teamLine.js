import react from 'react';
import Player from './player';

class TeamLine extends react.Component {

    renderPlayers() {
        const players = Object.values(this.props.team);
        const playerList = players.filter((player) => player.hasOwnProperty('collected'));
        const totalPlayers = playerList.length;
        const listItems = playerList.map((player, index) =>
            <Player key={index.toString()} handleClick={this.handleClick} team={this.props.team.name} player={player}></Player>
        );
        const totalCollectedPlayers = playerList.filter(player => player.collected).length;
        const totalPercentage = (100 * totalCollectedPlayers) / totalPlayers;
    return (
        <div>
            <div className='team-container'> 
                <div className='team-flag-container'>
                    <div className='flag-container'>
                        <img src={`${'https://flagcdn.com/32x24/'+this.props.team.flag+'.png'}`}></img>
                    </div>  
                    <div className='team-name'>
                        <div className='team-text'>{this.props.team.name}</div>
                        <div className='team-stats'>
                            <div>
                                <span>{totalCollectedPlayers}</span> / 
                                <span> {totalPlayers}</span>
                            </div>
                            <div className='team-stats-separator'></div>
                            <div>{totalPercentage.toFixed(0)} %</div>
                        </div>
                    </div>
                </div>
                <div className='team-players'>
                    {listItems}
                </div>
            </div>
        </div>
    )
    }

    handleClick = (event, data) => {
        this.props.handleClick(event, data);
    }

    render() {
        return(
            <div>
                {this.renderPlayers()}
            </div>
        )
    }
}

export default TeamLine;