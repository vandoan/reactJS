import React from 'react';
import PropTypes from 'prop-types';
import Guest from './Guest';


const GuestList = props => 

	<ul>
    {props.guests.map((guest, index) => 
      <Guest
        key={index}
        name={guest.name} 
        handleConfirmation={() => props.toggleConfirmationAt(index)}
        handleToggleEditing={() => props.toggleEditingAt(index)}
        isEditing={guest.isEditing}
        isConfirmed={guest.isConfirmed} 
        setName={text => props.setNameAt(text, index)}
        />
 	  )}
  </ul>;

GuestList.propTypes = {
	guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired
}
export default GuestList;