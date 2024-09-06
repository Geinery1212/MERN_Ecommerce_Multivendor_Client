import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import DetailsProduct from './pages/DetailsProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { get_categories, get_products } from './store/reducers/homeReducer';
import CategoryShop from './pages/CategoryShop';
import SearchProduct from './pages/SearchProduct';
import Payment from './pages/Payment';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_categories());
    dispatch(get_products())
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/shipping' element={<Shipping />}></Route>
        <Route path='/product/details/:slug' element={<DetailsProduct />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/products?' element={<CategoryShop />}></Route>
        <Route path='/products/search?' element={<SearchProduct />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
