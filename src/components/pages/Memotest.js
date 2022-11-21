import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './MemoTest.css'
import FancyButton from '../small/FancyButton';
import { useEffect } from 'react';


const Square = ({number,styles,onClick}) => {
    return (
      <div onClick={onClick} className="square" style={styles}  >
            {number}
      </div>
        
    );
  };
//el style de ahi arriba deberia ser un condicional, es que me cambie el fondo dependiendo de lo que suceda
//deberia crear un state que lo que haga es que guarde los valores que van ganando, y cuando se complete, analizar el state.
//deberia crear un array que me guarde los colores random que se asignan, y ponerselos a cada uno de los square. 

function MemoTest() {

  const [colorsState,setColorsState]=useState([]) //state que guarde los colores iniciales
  const [gameState,setGameState]=useState([]) // uno que vaya guardando los pares de colores
  const [gameEnded,setGameEnded]=useState(false) //uno para indicar cuando termina el juego
  const [matchState,setMatchState]=useState([]) // uno para ir comparando los colores
 
  if(colorsState.length===0) {

  const colors=["red","red","blue","blue","green","green","yellow","yellow","orange","orange","black","black"]
  const results=[];
  //el numero que sale random, asignarlo al nuevo array, y eliminarlo de colores con splice, y al haber uno menos en colores, hacer i-- un for para el i=11
  for(let i=11;i>0;i--) {
      
      const random=Math.floor(Math.random()*(i-1+1)+1)
      results.push(colors[random])
      colors.splice(random,1)//elimino desde el indice random, 1 elemento
      if(colors.length===1) {
          results.push(colors[0]) 
      }
      //este if lo pongo porque me quedaba colgando 1 elemento final en colors, entonces digo que cuando colors=1, agregue ese color a results.
   }  
     setColorsState(results)
     
  }


//}
//    return results
//lo que hice ahi fue que me agregue a results un color random, luego a colores con splice le saque ese color random. Entonces ahora el random de colores se ejecutara entre 10 indices y entre 11(arrancando desde cero), para eso esta el for, para ir restando 1 elemento.
//console.log(results)

//ahora deberia asignar results a cada square. 



//funcion para asignar los colores a cada square;

const winColor= {
    backgroundColor: "grey"
}
const defaultColor= {
  backgroundColor: "white"
}

function setColor(color) {
     return  (gameState.includes(color) ?  winColor : defaultColor)
} 


  function handleClick(e,color) {
      
      e.target.style.backgroundColor=color
      //e.target.style.pointerEvents="none" 
      setMatchState(prevState=>[...prevState,color])
    
  }   
  //tengo que poner que si el color es diferente de white(que significa que esta clickeado) o bien que si esta gris, no se pueda seleccionar.

  if(matchState.length==2) {
    if(matchState[0]===matchState[1]) {
        setGameState(prevState=>[...prevState,matchState[0],matchState[1]])
        for(let i=0;i<matchState.length;i++) {
            setColor(i)
        }
        
        setMatchState([])
    } else {
        setMatchState([])
    }
  }

  

  //function setColor(color) {
  // return  (gameState.includes(color) ?  winColor : defaultColor)
  //   /* if(gameState.includes(color)) {
  //        return winColors
  //    } else {
  //        return 
  //    }*/
  //}


    return {colorsState,handleClick,matchState,gameState,setColor}
}

//puedo armar una funcion que 

const playMemoTest=() => {
    const {colorsState,handleClick,matchState,gameState,setColor}=MemoTest()

    

return (
    //onClick={handleClick} styles={{backgroundColor: isActive && results[0]}}
    //onClick={e=>e.target.style.backgroundColor=results[1]} 
    /*styles={gameState.includes(colorsState[0])&&{backgroundColor:"grey"}}*/
    <div className='memotest'> 
        <div className='memotest-row'> 
            <Square  number={0} onClick={(e)=>handleClick(e,colorsState[0])} styles={setColor(colorsState[0])}/>
            <Square  number={1} onClick={(e)=>handleClick(e,colorsState[1])} styles={setColor(colorsState[1])}/>
            <Square  number={2} onClick={(e)=>handleClick(e,colorsState[2])} styles={setColor(colorsState[2])}/>
            <Square  number={3} onClick={(e)=>handleClick(e,colorsState[3])} styles={setColor(colorsState[3])}/>
        </div>
        <div className='memotest-row'>
            <Square  number={4} onClick={(e)=>handleClick(e,colorsState[4])} styles={setColor(colorsState[4])}/>
            <Square  number={5} onClick={(e)=>handleClick(e,colorsState[5])} styles={setColor(colorsState[5])}/>
            <Square  number={6} onClick={(e)=>handleClick(e,colorsState[6])} styles={setColor(colorsState[6])}/>
            <Square  number={7} onClick={(e)=>handleClick(e,colorsState[7])} styles={setColor(colorsState[7])}/>
        </div>
        <div className='memotest-row'>
            <Square  number={8} onClick={(e)=>handleClick(e,colorsState[8])}  styles={setColor(colorsState[8])}/>
            <Square  number={9} onClick={(e)=>handleClick(e,colorsState[9])}  styles={setColor(colorsState[9])}/>
            <Square  number={10} onClick={(e)=>handleClick(e,colorsState[10])} styles={setColor(colorsState[10])}/>
            <Square  number={11} onClick={(e)=>handleClick(e,colorsState[11])} styles={setColor(colorsState[11])}/>
        </div>

    </div>

)

}


export default playMemoTest; 