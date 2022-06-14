import './App.css';
import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import Cart from './Components/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/categories/:categoryName' element={<ItemListContainer />} />
          <Route path='/detailBook/:idBook' element={<ItemDetailContainer />} />
          <Route path='/cart' element={<Cart/>} />

        </Routes>
      </BrowserRouter>
    </CartProvider>

  )
};

export default App;
