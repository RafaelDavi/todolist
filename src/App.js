import './App.css';
import Lista from './Componentes/Lista/Lista';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';

function App() {

  const [listas, setListas] = useState([
    {
      "status_finalizado": false,
      "titulo": "Bem vindo",
      "itens": [
        {
          "nome": "adicionar um Lista",
          "status": "Não iniciado"
        },
        {
          "nome": "adicionar um Item",
          "status": "Não iniciado"
        },
        {
          "nome": "Mudar o status clicando nele",
          "status": "Não iniciado"
        },
        {
          "nome": "Arrumar os status após concluir",
          "status": "Não iniciado"
        }
      ]
    }
  ]);


  useEffect(() => {
    console.log('Lista alterada:', listas);
  }, [listas]);

  function adicionarLista(nome) {
    // Criando um novo objeto representando a lista a ser adicionada
    const novaLista = {
      "status_finalizado": false,
      "titulo": nome,
      "itens": []
    };

    // Criando uma cópia do array de listas atual
    const novasListas = [...listas];

    // Adicionando a nova lista à cópia do array
    novasListas.push(novaLista);

    // Atualizando o estado 'listas' com a nova lista adicionada
    setListas(novasListas);
  }

  function atualizaStatus(indexLista, indexItem, statusItem) {
    listas[indexLista].itens[indexItem].status = statusItem;
    validarConclusao(indexLista); // Pass the index parameter here
}


  function adicionarItem(index, nome) {
    const novoItem = {
      "nome": nome,
      "status": "Não iniciado"
    };

    // Criando uma cópia da lista na qual você deseja adicionar o novo item
    const novaLista = [...listas];

    // Adicionando o novo item à lista apropriada
    novaLista[index].itens.push(novoItem);

    // Atualizando o estado `listas` com a nova lista modificada
    setListas(novaLista);
  }

  function removerItem(listaIndex, itemIndex) {
    // Criando uma cópia da lista da qual você deseja remover o item
    const novaLista = [...listas];

    // Verificando se a listaIndex está dentro dos limites
    if (listaIndex >= 0 && listaIndex < novaLista.length) {
      // Removendo o item da lista
      novaLista[listaIndex].itens.splice(itemIndex, 1);

      // Atualizando o estado `listas` com a nova lista modificada
      setListas(novaLista);
    } else {
      console.error('Índice de lista inválido.');
    }
  }
  function removerLista(listaIndex) {
    // Criando uma cópia do array de listas atual
    const novasListas = [...listas];

    // Verificando se o listaIndex está dentro dos limites
    if (listaIndex >= 0 && listaIndex < novasListas.length) {
      // Removendo a lista do array
      novasListas.splice(listaIndex, 1);

      // Atualizando o estado 'listas' sem a lista removida
      setListas(novasListas);
    } else {
      console.error('Índice de lista inválido.');
    }
  }


  const validarConclusao = (index) => {
    let concluidos = 0;
    const status = listas[index].status_finalizado;
    listas[index].itens.map(lista => {
      if(lista.status === 'Concluido'){
        concluidos++
      }
    });
    if(listas[index].itens.length === concluidos && status === false){
      startCelebration(index)
    }

  };
  

  const [editando, setEditando] = useState(false);
  const [novaLista, setNovaLista] = useState('');
  const [enviarFormulario, setEnviarFormulario] = useState(false);
  const [atualiza, setAtualiza] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setNovaLista(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (novaLista.trim() !== '') {
      adicionarLista(novaLista)
      setAtualiza(!atualiza)
      setEditando(false)
      setNovaLista('')
    }
  };


  const [isCelebrating, setIsCelebrating] = useState(false);

  const startCelebration = (index) => {
    setIsCelebrating(true);
    listas[index].status_finalizado = true;
    setTimeout(() => {
      setIsCelebrating(false);
    }, 4000); // Desativa a celebração após 3 segundos
  };


  return (
    <div className="App">
      <h1>To do</h1>
      <p>ToDo List com status kanban</p>
      {editando ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef} // Atribuindo a referência ao input
            type='text'
            value={novaLista}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={() => { setEditando(false); setNovaLista(''); }}
            autoFocus // Definindo o autoFocus
          />
        </form>
      ) : (
        <div className='adicionar' onClick={() => { setEditando(true); inputRef.current && inputRef.current.focus(); }} style={{ background: '#DDDDDD' }}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }} /> lista
        </div>
      )}
      {listas.map((lista, index) => (

        <Lista index={index} titulo={lista.titulo} status={lista.status_finalizado} itens={lista.itens} funcaoADD={adicionarItem} funcaoDeleteLista={removerLista} funcaoDeleteItem={removerItem} funcaoUPD={atualizaStatus} />
      ))}
      {isCelebrating && <Confetti />}

    </div>
  );
}

export default App;
