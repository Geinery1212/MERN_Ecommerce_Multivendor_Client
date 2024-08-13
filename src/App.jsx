import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
