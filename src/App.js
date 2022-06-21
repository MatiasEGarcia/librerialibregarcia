import './App.css';
import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import CartListContainer from './Components/CartListContainer';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/categories/:categoryName' element={<ItemListContainer />} />
          <Route path='/detailBook/:idBook' element={<ItemDetailContainer />} />
          <Route path='/cart' element={<CartListContainer/>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>

  )
};

export default App;
