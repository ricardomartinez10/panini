import react from 'react';
import Player from './player';

class TeamLine extends react.Component {

    renderPlayers() {
        const players = Object.values(this.props.team);
        const playerList = players.filter((player) => player.hasOwnProperty('collected'));
        const listItems = playerList.map((player, index) =>
            <Player key={index.toString()} handleClick={this.handleClick} team={this.props.team.name} player={player}></Player>
  );
    return (
        <div className='team-players'>{listItems}</div>
    )
    }

    handleClick = (event, data) => {
        this.props.handleClick(event, data);
    }

    render() {
        return(
            <div className='team-container'> 
                <div className='flag-container'>
                    <img src={`${'https://flagcdn.com/32x24/'+this.props.team.flag+'.png'}`}></img>
                </div>  
                <div className='team-name'>
                    {this.props.team.name}
                </div>
                {this.renderPlayers()}
            </div>
        )
    }
}

export default TeamLine;