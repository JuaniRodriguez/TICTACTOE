import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';
import { useEffect } from 'react';

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.

  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }

  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};

//el proptypes es para decirle por ejemplo ahi que "value" tiene que recibir x,o o nada, entonces es ayuda para tirarme error en caso de que no sea ninguna de las 3. 
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show,winner,playerWinner, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${playerWinner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  // Esta propiedad decide si el componente se muestra o está oculto
  // También se podría mostrar el componente usando un if (&&), pero usamos esta prop para mostrar los estilos correctamente.
  show: PropTypes.bool.isRequired,
  winner: PropTypes.bool.isRequired,
  onRestart: PropTypes.func,
};

const getWinner = tiles => {

    const firstWinningWay=((((tiles[0]!=="" && tiles[0])===tiles[1]) && ((tiles[0]!=="" && tiles[0])===tiles[2]))) && true // porque si 0 es igual a 1, y 0 es igual a 2, entonces 1=2
    const secondWinningWay=((((tiles[3]!==""&& tiles[3])===tiles[4]) && ((tiles[3]!==""&& tiles[3])===tiles[5]))) && true
    const thirdWinningWay=((((tiles[6]!==""&& tiles[6])===tiles[7]) && ((tiles[6]!==""&& tiles[6])===tiles[8]))) && true
    const fourthWinningWay=((((tiles[0]!==""&& tiles[0])===tiles[3]) && ((tiles[0]!==""&& tiles[0])===tiles[6]))) && true
    const fifthWinningWay=((((tiles[1]!==""&& tiles[1])===tiles[4]) && ((tiles[1]!==""&& tiles[1])===tiles[7]))) && true
    const sixthWinningWay=((((tiles[2]!==""&& tiles[2])===tiles[5]) && ((tiles[2]!==""&& tiles[2])===tiles[8]))) && true
    const seventhWinningWay=((((tiles[0]!==""&& tiles[0])===tiles[4]) && ((tiles[0]!==""&& tiles[0])===tiles[8]))) && true
    const eigthWinningWay=((((tiles[2]!==""&& tiles[2])===tiles[4]) && ((tiles[2]!==""&& tiles[2])===tiles[6]))) && true

    const posibleWin=[firstWinningWay,secondWinningWay,thirdWinningWay,fourthWinningWay,fifthWinningWay,sixthWinningWay,seventhWinningWay,eigthWinningWay]
    const result=posibleWin.includes(true)//hare que al matchear ccon el primer true de array result, me devuelva true

  // calcular el ganador del partido a partir del estado del tablero
  // (existen varias formas de calcular esto, una posible es listar todos los
  // casos en los que un jugador gana y ver si alguno sucede)
  return result
  
}

const useTicTacToeGameState = initialPlayer => {
  const [tiles,setTiles] = useState(["","","","","","","","",""]);
  const [currentPlayer,setCurrentPlayer] = useState(initialPlayer);
  const winner = getWinner(tiles);
  const [gameEnded,setGameEnded] =useState(false);

  function handleCurrentPlayer() {
    return (
    setCurrentPlayer(prevPlayer=>prevPlayer==="X" ? "O" : "X" )
    )
  }
 
 
  const setTileTo = (tileIndex, player) => {
    //entonces como esta funcion maneja el onclick de cada div, la aprovecho para que cada vez que se haga click, me cambie el current player
    const newTiles=[...tiles]
    newTiles[tileIndex]=player
    setTiles(newTiles);
    

    handleCurrentPlayer()
    //tiles[tileIndex]=player
    // convertir el tile en la posición tileIndex al jugador seleccionado
    // ejemplo: setTileTo(0, 'X') -> convierte la primera casilla en 'X'
    

    //si yo dejo dentro de aca el console, al primer click no me muestra, recien al segundo click me muestra lo pendiente del primero
    //console.log(tiles[0])  
  };

  // el restart deberia pasarselo al onclick de onrestart de la winning card
  const restart = () => {

    setTiles(["","","","","","","","",""])
    setGameEnded(false)
    //setGameEnded(false)
    console.log(" para probar si lee el restart")

    //setGameEnded(false)
    // Reiniciar el juego a su estado inicial
  };


  useEffect(function() {
    if(winner || !tiles.includes("") ) {

      handleCurrentPlayer() // porque al ganar, se ejecuta el handle(como siempre) y me cambia de jugador, entonces el winnercard me tira como ganador el   otro jugador, por eso aca lo vuelvo a cambiar antes del setgameEnded que me lleva a la winnercard. Es decir, gane con la X, el handle me lo cambio a O entoncess winnercard me muestra ganador O, pero si aca vuelvo a cambiar el handle antes del setGameEnded que lleva a la winner, me mostrara bien el ganador.
      setGameEnded(true)
      console.log("ganaste")
    }
    

  },[tiles])
     
    
  // por si no reconocen esta sintáxis, es solamente una forma más corta de escribir:
  // { tiles: tiles, currentPlayer: currentPlayer, ...}
  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
   const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');


  return (
      gameEnded ?

      <WinnerCard show={true} winner={winner} playerWinner={currentPlayer} onRestart={restart}  />

      :
    <div className="tictactoe">

      <div className="tictactoe-row">
        <Square className="tictactoe-row" value={tiles[0]} onClick={()=> tiles[0]==="" && setTileTo(0,currentPlayer)}/>
        <Square className="tictactoe-row" value={tiles[1]} onClick={()=> tiles[1]==="" && setTileTo(1,currentPlayer)}/>
        <Square className="tictactoe-row" value={tiles[2]} onClick={()=> tiles[2]==="" && setTileTo(2,currentPlayer)}/>
      </div>
      <div className="tictactoe-row">
        <Square className="tictactoe-row" value={tiles[3]} onClick={()=> tiles[3]==="" && setTileTo(3,currentPlayer)}/>
        <Square className="tictactoe-row" value={tiles[4]} onClick={()=> tiles[4]==="" && setTileTo(4,currentPlayer)}/>
        <Square className="tictactoe-row" value={tiles[5]} onClick={()=> tiles[5]==="" && setTileTo(5,currentPlayer)}/>
      </div>
      <div className="tictactoe-row">
        <Square className="tictactoe-row" value={tiles[6]} onClick={()=>  tiles[6]==="" && setTileTo(6,currentPlayer)}/>
        <Square className="tictactoe-row" value={tiles[7]} onClick={()=>  tiles[7]==="" && setTileTo(7,currentPlayer)}/>
        <Square className="tictactoe-row" value={tiles[8]} onClick={()=>  tiles[8]==="" && setTileTo(8,currentPlayer)}/>
      </div>
    </div>
     

      /* Este componente debe contener la WinnerCard y 9 componentes Square, 
      separados en tres filas usando <div className="tictactoe-row">{...}</div> 
      para separar los cuadrados en diferentes filas */
  
  );
};
export default TicTacToe;
