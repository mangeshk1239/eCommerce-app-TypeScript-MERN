import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from "./containers/register/RegisterPage";
import LoginPage from "./containers/login/LoginPage";
import DashboardPage from './containers/dashboard/DashboardPage';
import ProductPage from "./containers/products/ProductPage";
import SingleProductPage from './containers/single-product/SingleProduct';

function App(): JSX.Element {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/product/:id' element={<SingleProductPage />} />
      </Routes>
    </>
  );
}

export default App;