import react from 'react';
import { useEffect, useState} from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore/lite';
import { dbConfig } from './firebase';
import './style.css';


function App () {
    
    const [listaTareas , setListaTareas ] = useState ([]);
    const [nombre, setNombre] = useState ('');
    const [detalles, setDetalles] = useState('');
    const [id, setId] = useState('');
    const [editar, setEditar] = useState ('');

    useEffect (() => {

        const obtenerDatos = async () => {
            
            try {
                const DB = collection(dbConfig, 'tareas');
                const listaTareas = await getDocs(DB);
                const listaFinal = listaTareas.docs.map((item)=> ({ id:item.id, ...item.data(),}));
                
                setListaTareas(listaFinal);

            }catch(e) {
                console.log('hubo un error');
                console.log(e);
            }
        };

        obtenerDatos();

    }, []);

    const submit = (e) => {
        e.preventDefault();
        if(editar) {
            actualizarEnDB();
        }else {
            guardarTarea();
        }
    };

    const guardarTarea = async () => {
        const tareaAGuardar = {
            nombre: nombre,
            detalles: detalles
        };

        try {
            const DB = collection ( dbConfig, 'tareas');
            const item = await addDoc (DB, tareaAGuardar);
            setListaTareas ([...listaTareas,
                { id: item.id, nombre: nombre, dtalles:detalles}]);

        }catch(e) {
            console.log('hubo un error');
            console.log(e);

        }
    };

    const handleFormNombre = (texto) => {
        setNombre(texto);
    };

    const handleFormDetalles = (texto) => {
        setDetalles(texto);
    };

    const editarTarea = (item) => {
        setEditar(true);
        setNombre(item.nombre);
        setDetalles(item.detalles);
        setId(item.id);
    };

    const actualizarEnDB = async () => {
        try {
            const data = {
                nombre: nombre,
                detalles: detalles
            };

            const configurar = doc ( dbConfig, 'tareas', id);
            await updateDoc (configurar, data);
            const resultadoFiltrado = listaTareas.map((item)=>(
                item.id === id
                ? {id: item.id, nombre: nombre, detalles: detalles}
                :item
            ));

            setListaTareas (resultadoFiltrado);

        }catch (e) {
            console.log('hubo un error');
            console.log(e);

        }
    };

 //Eliminar Delete
    const eliminarTarea =  async(item) => {

        try {

            const ref =  doc(dbConfig, 'tareas', item.id);
            await deleteDoc(ref);

            const resultadoFiltrado = listaTareas.filter(
                x => x.id !== item.id);

            setListaTareas(resultadoFiltrado);
        } catch (e) {
            console.log('hubo un error');
            console.log(e);
        }
    };

    // Lista de Tareas
 
    return (
      <div className="container">
          
          <div className="header__principal">
            
          </div>


       <div className="container__1">
        <div>
        <h3>
            {editar ? 'Editar tarea' : 'Agregar tarea'}
            </h3>
          <form onSubmit={submit}>
          <label className="form-label"> Tarea </label>

          <input type= 'text' className= 'form-control'
          onChange={(e)=>handleFormNombre(e.target.value)}
          value= {nombre} />
          
          <label className='form-label'> Detalles </label>

          <input type= 'text' className="form-control"
          onChange={(e)=>handleFormDetalles(e.target.value)}
          value={detalles}/>

          <div className= 'mt-4'>
          <button type= 'submit'className="btn btn-dark ">
            {editar ? 'Actualizar' : 'Agregar'} </button>
            </div>
          </form>
        
        </div>
        <div className='divisor'></div>
        <div className="">
        <h3>Lista de tareas</h3>
          <ul className="list-group">
            {listaTareas.map((item) => (
                <li key = {item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {item.nombre}

                <button className="btn btn-outline-warning"
                onClick={(e)=> editarTarea(item)} >Editar</button>

                <button className="btn btn-outline-danger"
                onClick={(e)=> eliminarTarea(item)}>Eliminar</button>
                </li>
              ))}
          </ul>

        </div>
        <div className= 'footer'></div>
      </div>
    </div>
    );
}

export default App;
