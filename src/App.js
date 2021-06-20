import React, {useState} from 'react';
import './App.css';

function App() {
const [inputValue, setInputValue] = useState("")

const addTodo =() => {
  
}

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default App;
