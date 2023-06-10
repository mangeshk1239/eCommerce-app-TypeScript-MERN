import * as React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from "./containers/register/RegisterPage";
import LoginPage from "./containers/login/LoginPage";
import DashboardPage from './containers/dashboard/DashboardPage';
import ProductPage from "./containers/products/ProductPage";
import SingleProductPage from './containers/single-product/SingleProduct';
import CartPage from './containers/cart/CartPage';

interface ICartItem {
  product_id: number,
  product_name: string,
  product_price: number,
  product_quantity: number,
  product_image: string
}

interface ICart {
  CART: ICartItem[],
}

interface IAction {
  CART: string
}

export const ParentContext = React.createContext({});

export const ACTION: IAction = {
  CART: 'cart',
};

function App(): JSX.Element {

  const INITIAL_VALUES: ICart = {
    CART: [],
  };

  const [state, dispatch] = React.useReducer(reducer, INITIAL_VALUES);

  return (
    <ParentContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/product/:id' element={<SingleProductPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </ParentContext.Provider>
  );

  function reducer(state, action) {

    let cartArray;

    switch (action.type) {
      case ACTION.CART:

        cartArray = [...state.CART];
        cartArray.push(action.payload);
        return { ...state, CART: cartArray };

      default:
        return state;
    }

  }

}

export default App;