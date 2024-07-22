import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminOrders from './pages/admin/AdminOrders';
import AdminArticles from './pages/admin/AdminArticles';
import ArticleDetail from './pages/front/ArticleDetail';
import Layout from './pages/front/Layout';
import Home from './pages/front/Home';
import About from './pages/front/About';
import Articles from './pages/front/Articles';
import Products from './pages/front/Products';
import ProductDetail from './pages/front/ProductDetail';
import Cart from './pages/front/Cart';
import Checkout from './pages/front/Checkout';
import Success from './pages/front/Success';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='about' element={<About />}></Route>
          <Route path='articles' element={<Articles />}>
            <Route path=':tag' element={<Articles />}></Route>
          </Route>
          <Route path='article/:id' element={<ArticleDetail />}></Route>
          <Route path='' element={<Home />}></Route>
          <Route path='products' element={<Products />}>
            <Route path=':category' element={<Products />}></Route>
          </Route>
          <Route path='product/:id' element={<ProductDetail />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='checkout' element={<Checkout />}></Route>
          <Route path='success/:orderId' element={<Success />}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path='products' element={<AdminProducts />}></Route>
          <Route path='coupons' element={<AdminCoupons />}></Route>
          <Route path='orders' element={<AdminOrders />}></Route>
          <Route path='articles' element={<AdminArticles />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
