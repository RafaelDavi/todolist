import React, { useState, useRef } from 'react';
import Item from '../Item/Item';
import './Lista.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

function Lista(props) {
    const [editando, setEditando] = useState(false);
    const [novoItem, setNovoItem] = useState('');
    const [atualiza, setAtualiza] = useState('');
    const [enviarFormulario, setEnviarFormulario] = useState(false);
    const inputRef = useRef(null); // Criando uma referência para o input

    const handleInputChange = (event) => {
        setNovoItem(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEnviarFormulario(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (novoItem.trim() !== '') {
            props.funcaoADD(props.index, novoItem)
            setEnviarFormulario(true)
            setEditando(false)
            setNovoItem('')
        }
    };

    return (
        <div className='Lista' id={`lista${props.index}`}>
            <h2 style={{ color: props.status ? '#3538aa80' : '#35383e80' }}>
                {props.titulo} 
                <FontAwesomeIcon onClick={() => { props.funcaoDeleteLista(props.index) }} title='excluir' icon={faX} style={{ float: 'right', fontSize:'12px' }}/>
            </h2>
            <hr />
            <ul>
                {props.itens.map((item, index) => (
                    <Item funcaoDelete={props.funcaoDeleteItem} funcaoUPD={props.funcaoUPD} nome={item.nome} status={item.status} indexLista={props.index} index={index} atualiza={atualiza} setAtualiza={setAtualiza}/>
                ))}

                {editando  ? (
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={inputRef} // Atribuindo a referência ao input
                            type='text'
                            value={novoItem}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onBlur={() => {setEditando(false);setNovoItem('');}}
                            autoFocus // Definindo o autoFocus
                        />
                    </form>
                ) : (
                    <li onClick={() => { setEditando(true); inputRef.current && inputRef.current.focus(); }} style={{ background: '#DDDDDD' }}>
                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }}/>Adicionar Item
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Lista;
