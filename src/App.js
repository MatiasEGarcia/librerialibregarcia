import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import CartListContainer from './components/CartListContainer';
import { NotificationProvider } from './notification/Notification';

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/categories/:categoryName' element={<ItemListContainer />} />
            <Route path='/detailBook/:idBook' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<CartListContainer />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </NotificationProvider>
  )
};

export default App;
