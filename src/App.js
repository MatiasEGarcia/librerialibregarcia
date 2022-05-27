import './App.css';
import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';


function App() {
  return (
    <div>
      <NavBar/>
      <ItemListContainer saludo='Holass , perdon por tardar en enviar el desafio' />
    </div>
  );
}

export default App;
