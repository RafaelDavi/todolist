import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare, faSquarePlus, faTriangleExclamation, faX } from '@fortawesome/free-solid-svg-icons';

function Item(props) {

    const iconStatus = (status) => {
        switch (status) {
            case 'Não iniciado':
                return faTriangleExclamation;
            case 'Concluido':
                return faSquareCheck;
            case 'Pendente':
                return faSquare;
            default:
                return null;
        }
    };

    const colorStatus = (status) => {
        switch (status) {
            case 'Não iniciado':
                return '#FF000050';
            case 'Concluido':
                return '#00CD2D25';
            case 'Pendente':
                return '#FFB93125';
            default:
                return null;
        }
    };

    const [editando, setEditando] = useState(false);

    return (
        <li style={{ background: colorStatus(props.status) }}>
            {editando ?
                <div className="dropdown" style={{ marginRight: '10px', color: 'white', float:'left'}}>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className="dropdown-item" onClick={(e) => { props.funcaoUPD(props.indexLista, props.index, 'Não iniciado'); setEditando(false); props.setAtualiza(!props.atualiza);}}>
                        <FontAwesomeIcon title='Não iniciado' style={{color:'#FF0000DD'}} icon={faTriangleExclamation} />
                    </div>
                    <div className="dropdown-item" onClick={(e) => { props.funcaoUPD(props.indexLista, props.index, 'Pendente'); setEditando(false); props.setAtualiza(!props.atualiza);}}>
                        <FontAwesomeIcon title='pendente' style={{color:'#FFB931DD'}} icon={faSquare} />
                    </div>
                    <div className="dropdown-item" onClick={(e) => { props.funcaoUPD(props.indexLista, props.index, 'Concluido'); setEditando(false); props.setAtualiza(!props.atualiza);}}>
                        <FontAwesomeIcon title='concluiso' style={{color:'#00CD2DDD'}} icon={faSquareCheck} />
                    </div>                    
                </div>
            </div> :
                <div onClick={() => { setEditando(true); }} style={{float:'left'}}>
                    <FontAwesomeIcon  icon={iconStatus(props.status)} style={{ marginRight: '10px' }} />
                    
                </div>
                
            }
            <span style={{width:'85%'}}>{props.nome}</span> <FontAwesomeIcon onClick={() => { props.funcaoDelete(props.indexLista, props.index) }} title='excluir' icon={faX} style={{ position:'relative', float:'right', fontSize:'12px', marginTop:'0px' }}/>
        </li>
    );
}

export default Item;