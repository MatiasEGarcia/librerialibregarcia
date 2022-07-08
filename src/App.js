import './App.css';
import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import CartListContainer from './Components/CartListContainer';
import { NotificationProvider } from './Notification/Notification';
import { AuthProvider } from './context/AuthContext';
import Account from './Components/Account';

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' element={<ItemListContainer />} />
              <Route path='/categories/:categoryName' element={<ItemListContainer />} />
              <Route path='/detailBook/:idBook' element={<ItemDetailContainer />} />
              <Route path='/cart' element={<CartListContainer />} />
              <Route path='/account/:accion' element={<Account />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </NotificationProvider>

  )
};

export default App;
