import * as React from 'react';
import react from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import soccerService from '../services/soccer.service';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default class BasicModal extends react.Component {

constructor() {
    super();
    this.soccerService = new soccerService();
    this.state = {
      title: ''
    }
}

handleClose = (event) => {
    this.props.closeModal(event, false);
}

updatePlayer = () => {
  const playerData = this.props.playerData;
  const collected = !playerData.collected;

  this.soccerService.updatePlayer(playerData.team, playerData.player, collected);
  this.handleClose();
};

repeatedPlayer = () => {
  const playerData = this.props.playerData;
  const repeated = !playerData.repeated;
  this.soccerService.repeatedPlayer(playerData.team, playerData.player, repeated);
  this.handleClose();
}

render() {
    return (
        <div>
          <Modal
            open={this.props.openModal}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <div className='modal-container'>
                  <h2 className='modal-title'>{this.props.playerData.team}{this.props.playerData.player}</h2>
                  {!this.props.playerData.repeated ? (
                    <div className='modal-button' onClick={this.updatePlayer}>{this.props.playerData.collected ? 'Quitar' : 'Agregar'}</div>
                  ) : (null)}
                  {this.props.playerData.repeated || this.props.playerData.collected ? (
                    <div className={`modal-button repeated ${this.props.playerData.collected && this.props.playerData.repeated ? 'remove-repeated' : ''}`} onClick={this.repeatedPlayer}>{this.props.playerData.repeated ? 'Quitar Repetido' : 'Repetido'}</div>
                  ) : (null)}
                </div>
            </Box>
          </Modal>
        </div>
      );
  }
}
