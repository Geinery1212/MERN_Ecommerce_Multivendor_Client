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
import Dashboard from './pages/Dashboard';
import ProtectUser from './utilities/ProtectUser';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import ChangePassword from './components/dashboard/ChangePassword';
import WishList from './components/dashboard/WishList';
import OrderDetails from './components/dashboard/OrderDetails';

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
        <Route path='/dashboard' element={<ProtectUser />}>
          <Route path='' element={<Dashboard />}>
            <Route path='' element={<Index />} />
            <Route path='my-orders' element={<Orders />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='wishlist' element={<WishList />} />
            <Route path='order/details/:id' element={<OrderDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
