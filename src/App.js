import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const onIncrement = ({...state}) => {
  state.counter = state.counter + 1;
  return state;
};

export const onDecrement = ({...state}) => {
  state.counter = state.counter - 1;
  return state; 
};

export const Counter = ({ counter }) => {
  return <p>{counter}</p>
};

export const App = () => {
  const [ state, setState ] = useState({counter:0, asyncCounters:null});
  useEffect(({...state})=>{
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(counter => (state.asyncCounters = counter))
    .catch(error => console.log(error));
  })
  
  const doIncrement = () => {
    setState(onIncrement);
  };
  const doDecrement = () => {
    setState(onDecrement);
  };

  return (
    <div>
      <Counter counter={state.counter}/>
      <button onClick={doIncrement}>플러스 +</button>
      <button onClick={doDecrement}>마이너스 -</button>
    </div>
  );
};

export default App;