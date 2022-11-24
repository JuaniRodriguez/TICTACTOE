import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './MemoTest.css'
import FancyButton from '../small/FancyButton';
import { useEffect } from 'react';


const Square = ({number,styles,onClick}) => {
    return (
      <div onClick={onClick} className="square" style={styles}>{number}</div>
    );
};

const WinnerCard = ({ show, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
          YOU WON!
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};


function MemoTest() {
  const game = document.querySelector("#root");
  const [colorsState,setColorsState]=useState([]) //state que guarde los colores iniciales
  const [gameState,setGameState]=useState([]) // uno que vaya guardando los pares de colores
  const [matchState,setMatchState]=useState([]) // uno para ir comparando los colores
  const [saveSquare,setSaveSquare]=useState([]) // guarda los div de cada square, es decir el target
  const [gameEnded,setGameEnded]=useState(false) //uno para indicar cuando termina el juego
 
  if(colorsState.length===0) {

    const colors=["red","red","blue","blue","green","green","yellow","yellow","orange","orange","black","black"]
    const results=[];
   
    for(let i=11;i>0;i--) {

      const random=Math.floor(Math.random()*(i-1+1)+1)
      results.push(colors[random])
      colors.splice(random,1)
      if(colors.length===1) {
          results.push(colors[0]) 
      }
    }

    setColorsState(results)
     
  }

  const winColor= {
      backgroundColor: "grey"
  }
  const defaultColor= {
    backgroundColor: ""
  }


  function setColor(color) {
       return  (gameState.includes(color) ?  winColor : defaultColor)
  } 


  function handleClick(e,color) {
    e.persist()
    setSaveSquare(prevState=>[...prevState,e.target])
    e.target.style.pointerEvents="none"
    e.target.style.backgroundColor=color
    setMatchState(prevState=>[...prevState,color])
  } 
 
  if(matchState.length==2) {
    game.style.pointerEvents="none"
        
    if(matchState[0]===matchState[1] ) {
        setTimeout(() => {
        setGameState(prevState=>[...prevState,matchState[0],matchState[1]])
        
        }, 1000);
        setTimeout(() => {
            game.style.pointerEvents="all"
            
        }, 1001);
        saveSquare[0].style.pointerEvents="none"
        saveSquare[1].style.pointerEvents="none"
        
        setMatchState([])
        setSaveSquare([])
    } else {
        setTimeout(() => {
          saveSquare[0].style=""
          saveSquare[1].style=""
          //saveSquare[0].style.pointerEvents=""/*** */
          //saveSquare[1].style.pointerEvents=""/*** */
        }, 1000);
        setTimeout(() => {
          game.style.pointerEvents="all"
        }, 1001);
        setMatchState([])
        setSaveSquare([])
    }
    
  }
  
  useEffect(function() {
    (gameState.length===12 && setGameEnded(true))

  },[gameState])

  function restart() {
    setGameState([])
    setColorsState([])
    setGameEnded(false)
  }



  return {colorsState,gameState,matchState,gameEnded,handleClick,setColor,restart}
}


const playMemoTest=() => {
  const {colorsState,gameState,matchState,gameEnded,handleClick,setColor,restart}=MemoTest()

  return (
  
    gameEnded ?
  
        <WinnerCard show={true} onRestart={restart} />
  
    :
  
      <div className='memotest'> 
          <div className='memotest-row'> 
              <Square  number={0}  onClick={(e)=>handleClick(e,colorsState[0])} styles={setColor(colorsState[0])}/>
              <Square  number={1}  onClick={(e)=>handleClick(e,colorsState[1])} styles={setColor(colorsState[1])}/>
              <Square  number={2}  onClick={(e)=>handleClick(e,colorsState[2])} styles={setColor(colorsState[2])}/>
              <Square  number={3}  onClick={(e)=>handleClick(e,colorsState[3])} styles={setColor(colorsState[3])}/>
          </div>
          <div className='memotest-row'>
              <Square  number={4}  onClick={(e)=>handleClick(e,colorsState[4])} styles={setColor(colorsState[4])}/>
              <Square  number={5}  onClick={(e)=>handleClick(e,colorsState[5])} styles={setColor(colorsState[5])}/>
              <Square  number={6}  onClick={(e)=>handleClick(e,colorsState[6])} styles={setColor(colorsState[6])}/>
              <Square  number={7}  onClick={(e)=>handleClick(e,colorsState[7])} styles={setColor(colorsState[7])}/>
          </div>
          <div className='memotest-row'>
              <Square  number={8}  onClick={(e)=>handleClick(e,colorsState[8])}  styles={setColor(colorsState[8])}/>
              <Square  number={9}  onClick={(e)=>handleClick(e,colorsState[9])}  styles={setColor(colorsState[9])}/>
              <Square  number={10} onClick={(e)=>handleClick(e,colorsState[10])} styles={setColor(colorsState[10])}/>
              <Square  number={11} onClick={(e)=>handleClick(e,colorsState[11])} styles={setColor(colorsState[11])}/>
          </div>
  
      </div>
  
   ) 

}


export default playMemoTest; 