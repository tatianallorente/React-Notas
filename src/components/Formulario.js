import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Sirve para indicar el tipo de los componentes (array, string, etc)
import PropTypes from 'prop-types';

// Iconos
import arrows_circle_plus from '/img/arrows_circle_plus.svg';

const Formulario = ({crearNota}) => {

    // Crear State de notas
    const [nota, actualizarNota] = useState(
        // llaves porque es un objeto
        {
        titulo: '',
        creador: '',
        fecha: '',
        hora: '',
        descripcion: ''
        }
    )

    // Crear State de errores
    const [error, actualizarError] = useState( false )


    // Función que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        // console.log(e.target.name);
        // console.log(e.target.value); 
        actualizarNota({
            // Primero hay que hacer una copia del State para no perder la referencia,sino, cada campo sobreescribiría el anterior y solo tendriamos el valor de uno (para la copia usamos el spread operator)
            ...nota,
            [e.target.name]: e.target.value
        })   
    }

    // Extraer los valores
    // Con esto evitamos tener que escribir nota.titulo etc
    const { titulo, creador, fecha, hora, descripcion } = nota;

    // Enviar formulario submit
    const submitNota = e => {
        e.preventDefault();
        //console.log('enviando form');
        
        // Validar
        if (titulo.trim() === '' || creador.trim() === '' 
            || fecha.trim() === '' || hora.trim() === '' || descripcion.trim() === ''){
            actualizarError(true);
            return; // Para que no continue ejecutando el código           
        }

        // Eliminar el mensaje de error previo, en caso de haberlo
        actualizarError(false);

        // Asignar un ID (no tenemos BBDD, así que usamos la librería uuid)
        nota.id = uuidv4();
        

        // Crear la nota
        crearNota(nota);

        // Reiniciar el form
        actualizarNota(
            {
                titulo: '',
                creador: '',
                fecha: '',
                hora: '',
                descripcion: ''
            }
        )      
    }

    return ( 
        <Fragment>
            <h2>Crear nota</h2>

            { error ? <p className="msg-error">Todos los campos son obligatorios</p>: null }

            <form
                onSubmit={submitNota}
            >

                <label>Título de la nota</label>
                <input 
                    type="text" 
                    name="titulo"
                    className="u-full-width" 
                    placeholder="Ej: Mi primera nota" 
                    onChange={actualizarState}
                    value={titulo}
                />

                <label>Usuario</label>
                <input 
                    type="text" 
                    name="creador"
                    className="u-full-width"  
                    placeholder="Ej: Tatiana Llorente"  
                    onChange={actualizarState}
                    value={creador}
                />

                <div class="row">
                    <label className="six columns">Fecha</label>
                    <label className="six columns">Hora</label>
                </div>
                <div class="row">
                    <input 
                        type="date" 
                        className="six columns"
                        name="fecha" 
                        onChange={actualizarState}
                        value={fecha}
                    />  
                    <input 
                        type="time" 
                        className="six columns"
                        name="hora"  
                        onChange={actualizarState}
                        value={hora}
                    />
                </div>

                <label>Descripción</label>
                <textarea 
                    className="u-full-width"
                    name="descripcion" 
                    onChange={actualizarState}
                    value={descripcion}
                ></textarea>
           
                
                <button type="submit" className="boton-submit">
                    <span>Crear nota</span>
                    <img src={arrows_circle_plus} alt={arrows_circle_plus} class="iconos"/>               
                </button>
            </form>
        </Fragment>
    );
}
 
// PropTypes (documentación)
Formulario.propTypes = {
    crearNota: PropTypes.func.isRequired
}


export default Formulario;