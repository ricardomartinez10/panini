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
                  <h1 className='modal-title'>{this.props.playerData.collected ? 'Quitar' : 'Agregar'}</h1>
                  <h2 className='modal-title'>{this.props.playerData.team}{this.props.playerData.player}</h2>
                  <div className='modal-button' onClick={this.updatePlayer}>Confirmar</div>
                </div>
            </Box>
          </Modal>
        </div>
      );
  }
}
