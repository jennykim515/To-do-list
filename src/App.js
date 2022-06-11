import './App.css';
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import trash from "./delete.png";
import useSound from 'use-sound';
import bam from './bam.wav';


export default function App() {
  const [items, setItems] = useState([]);
  const [toDoItem, setToDoItem] = useState('');
  const [playbackRate] = React.useState(0.75);

  
  // sets local storage
  useEffect(() => {
    if(items.length !== 0) {        
     localStorage.setItem(
      'items',
       JSON.stringify(items)
     );
    } 
   }, [items]);

  // retrieves local storage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
    setItems(items);
    }
  }, []);
  
  // returns to-do item
  const things = items.map((thing, index) => {
    return( 
      <div>
        <p className="item" onClick={handleClick} key={index}>{thing}
        <img onClick={() => handleTrash(index)} className="trash" src={trash} alt="trash-can"/>
        </p>
      </div>
    )
  })

  // plays audio
  const [play] = useSound(bam, {
    playbackRate,
    interrupt: true,
  });

  // removes to-do item
  function handleTrash(index) {
    let newArray = [...items];
    newArray.splice(index, 1);
    setItems(newArray);
    play();
  }


  // strikes through to-do item
  function handleClick(event) {
    if (event.target.style.textDecoration) {
      event.target.style.removeProperty('text-decoration');
    } else {
      event.target.style.setProperty('text-decoration', 'line-through');
      play();
    }
  }

  // adds item and resets input
  const handleSubmit = (e) => {
    if(toDoItem.length !== 0) {
      e.preventDefault();
      setItems(prevState => {
        return [...prevState, toDoItem]
      })
      setToDoItem("");
    }
  }

  return (
    <div className='contain my-3'>
      <h1>Tasks</h1>
      <div className="my-3"><hr></hr></div>
      {things}
      <form onSubmit={handleSubmit}>
        <input 
          className="form-control"
          placeholder='to do'
          type='text'
          value = {toDoItem}
          onChange={(e) => setToDoItem(e.target.value)}
        ></input>
      </form>
      <button 
        className="btn btn-primary my-3"
        type="submit">Add Item
      </button>
    </div>
  );
}