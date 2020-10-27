import React from 'react';
import PropTypes from 'prop-types';

// Iconos
import basic_trashcan from '../img/basic_trashcan.svg';
import basic_pin2 from '../img/basic_pin2.svg';

const nota = ({nota, eliminarNota}) => (
    <div className="nota">
        <div>
            <img src={basic_pin2} alt={basic_pin2} class="pin"/> 
            <p>Título: <span>{nota.titulo}</span> </p>
            <p>Creador: <span>{nota.creador}</span> </p>
            <p>Fecha: <span>{nota.fecha}</span> </p>
            <p>Hora: <span>{nota.hora}</span> </p>
            <p>Descripción: <span>{nota.descripcion}</span> </p>
        </div>
        <div>
            <button 
                onClick={() => eliminarNota(nota.id)}
                type="button" 
                className="button eliminar u-full-width">
                <span>Eliminar nota</span>
                <img src={basic_trashcan} alt={basic_trashcan} class="iconos"/>  
            </button>
        </div>
    </div>
);
 

// PropTypes
nota.propTypes = {
    nota: PropTypes.object.isRequired,
    eliminarNota: PropTypes.func.isRequired
}
  

export default nota;