import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Nota from './components/Nota';

function App() {

    // Notas en el localStorage (solo admite strings)
    let notasIniciales = JSON.parse(localStorage.getItem('notas'));
    if (!notasIniciales) {
        notasIniciales = [];
    }

    // Array con todas las notas
    const [notas, guardarNotas] = useState([]);

    // UseEffect para realizar ciertas tareas cuando el State cambie
    // Es como el document.ready de jQuery, detecta cuando la página se ha cargado y también cuándo se ha actualizado algún State. También es como el antiguo componentDidMount()
    /*
    useEffect( () => {
        console.log('listo');
    }, [] ); // Le pasamos un array vacío [] para que solo se ejecute una vez
    */

    useEffect( () => {
        // console.log('listo');
        // Guardar las notas en localSotrage 
        let notasIniciales = JSON.parse(localStorage.getItem('notas'));
        
        if (notasIniciales) {
            localStorage.setItem('notas', JSON.stringify(notas));
        } else {
            localStorage.setItem('notas', JSON.stringify([]));
      }
      
  }, [notas] ); // Cuando el State de una nota cambie, entrará en esta función


    // Función que obtenga las notas actuales y agregue la nueva
    const crearNota = nota => {
        //console.log(nota);
        guardarNotas(
            [
                ...notas,
                nota
            ]
        );
    }

    // Función para borrar notas por su id
    const eliminarNota = id => {
        //console.log(id);
        const nuevasnotas = notas.filter(nota => nota.id !== id);
        guardarNotas(nuevasnotas);
    }

    // Mensaje condicional
    //console.log('notas.length');
    const titulo = notas.length === 0 ? 'No hay notas': 'Administra tus notas';
    

    return (
        <Fragment>
            <h1>Gestor de notas</h1>

            <div className="container">
                <div className="row">
                    <div className="one-half form-notas">
                        <Formulario
                            crearNota={crearNota}
                        />
                    </div>
                </div>
                <div className="row">
                    <h2>{titulo}</h2>
                    <div className="lista-notas">
                        {notas.map(nota => (
                            <Nota
                                key={nota.id}
                                nota={nota}
                                eliminarNota={eliminarNota}
                                className="nota"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
