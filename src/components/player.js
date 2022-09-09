import react from 'react';
import soccerService from "../services/soccer.service";

class Player extends react.Component {

    constructor(){
        super();
        this.soccerService = new soccerService();
    }

    selectPlayer = (event) => {
        const team = this.props.team;
        const player = this.props.player.key;
        const collected = this.props.player.collected;
        const repeated = this.props.player.repeated;

        this.props.handleClick(event, {
            team,
            player,
            collected,
            repeated
        });
    };

    render() {
        return(
            <div onClick={this.selectPlayer} className={`player-container ${this.props.player.collected ? 'player-collected' : 'player-missing'} ${this.props.player.repeated ? 'player-repeated' : ''} `}>
                <div className="player-key">{this.props.player.key}</div>
            </div>
        );
    }
}

export default Player;