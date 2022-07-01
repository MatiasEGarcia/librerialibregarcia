import './App.css';
import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import CartListContainer from './Components/CartListContainer';
import { NotificationProvider } from './Notification/Notification';

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
