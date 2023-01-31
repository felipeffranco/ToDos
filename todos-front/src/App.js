import './App.css';
import AllToDosPage from './pages/AllToDosPage';
import EditToDo from './pages/ToDoEditPage';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
     
     <Routes>
      <Route path='/' element={ <AllToDosPage /> }/>
      <Route path='/:id' element={ <EditToDo /> }/>
     </Routes>
    </div>
  );
}

export default App;
