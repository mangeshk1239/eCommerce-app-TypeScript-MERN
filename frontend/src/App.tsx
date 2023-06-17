import * as React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from "./containers/register/RegisterPage";
import LoginPage from "./containers/login/LoginPage";
import DashboardPage from './containers/dashboard/DashboardPage';
import ProductPage from "./containers/products/ProductPage";
import SingleProductPage from './containers/single-product/SingleProduct';
import CartPage from './containers/cart/CartPage';
import CheckoutPage from "./containers/checkout/CheckoutPage";

interface ICartItem {
  product_id: number,
  product_name: string,
  product_price: number,
  product_quantity: number,
  product_image: string
}

interface ICheckoutAddress {
  first_name: string,
  last_name: string,
  first_address: string,
  last_address: string,
  city: string,
  state: string,
  zip_code: string,
  country: string
}

interface ICheckoutPayment {
  card_name: string,
  card_number: string,
  card_expiry: string,
  card_cvv: string
}

interface ICart {
  CART: ICartItem[],
  CHECKOUT_ADDRESS: ICheckoutAddress,
  CHECKOUT_PAYMENT: ICheckoutPayment
}

interface IAction {
  CART: string,
  CHECKOUT_ADDRESS: ICheckoutAddress,
  CHECKOUT_PAYMENT: ICheckoutPayment
}

export const ParentContext = React.createContext({});

export const ACTION: IAction = {
  CART: 'cart',
  CHECKOUT_ADDRESS: {
    first_name: "first_name",
    last_name: "last_name",
    first_address: "first_address",
    last_address: "last_address",
    city: "city",
    state: "state",
    zip_code: "zip_code",
    country: "country"
  },
  CHECKOUT_PAYMENT: {
    card_name: "card_name",
    card_number: "card_number",
    card_expiry: "card_expiry",
    card_cvv: "card_cvv"
  }
};

function App(): JSX.Element {

  const INITIAL_VALUES: ICart = {
    CART: [],
    CHECKOUT_ADDRESS: {
      first_name: "",
      last_name: "",
      first_address: "",
      last_address: "",
      city: "",
      state: "",
      zip_code: "",
      country: ""
    },
    CHECKOUT_PAYMENT: {
      card_name: "",
      card_number: "",
      card_expiry: "",
      card_cvv: ""
    }
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
        <Route path='/checkout' element={<CheckoutPage />} />
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

      case ACTION.CHECKOUT_ADDRESS.first_name:

        return { ...state, CHECKOUT_ADDRESS: { ...state.CHECKOUT_ADDRESS, first_name: action.payload } };

      case ACTION.CHECKOUT_ADDRESS.last_name:

        return { ...state, CHECKOUT_ADDRESS: { ...state.CHECKOUT_ADDRESS, last_name: action.payload } };

      case ACTION.CHECKOUT_ADDRESS.first_address:

        return { ...state, CHECKOUT_ADDRESS: { ...state.CHECKOUT_ADDRESS, first_address: action.payload } };

      case ACTION.CHECKOUT_ADDRESS.last_address:

        return { ...state, CHECKOUT_ADDRESS: { ...state.CHECKOUT_ADDRESS, last_address: action.payload } };

      case ACTION.CHECKOUT_ADDRESS.city:

        return { ...state, CHECKOUT_ADDRESS: { ...state.CHECKOUT_ADDRESS, city: action.payload } };

      case ACTION.CHECKOUT_ADDRESS.state:

        return { ...state, CHECKOUT_ADDRESS: { ...state.CHECKOUT_ADDRESS, state: action.payload } };

      case ACTION.CHECKOUT_ADDRESS.zip_code:

        return { ...state, CHECKOUT_ADDRESS: { ...state.CHECKOUT_ADDRESS, zip_code: action.payload } };

      case ACTION.CHECKOUT_ADDRESS.country:

        return { ...state, CHECKOUT_ADDRESS: { ...state.CHECKOUT_ADDRESS, country: action.payload } };

      case ACTION.CHECKOUT_PAYMENT.card_name:

        return { ...state, CHECKOUT_PAYMENT: { ...state.CHECKOUT_PAYMENT, card_name: action.payload } };

      case ACTION.CHECKOUT_PAYMENT.card_number:

        return { ...state, CHECKOUT_PAYMENT: { ...state.CHECKOUT_PAYMENT, card_number: action.payload } };

      case ACTION.CHECKOUT_PAYMENT.card_expiry:

        return { ...state, CHECKOUT_PAYMENT: { ...state.CHECKOUT_PAYMENT, card_expiry: action.payload } };

      case ACTION.CHECKOUT_PAYMENT.card_cvv:

        return { ...state, CHECKOUT_PAYMENT: { ...state.CHECKOUT_PAYMENT, card_cvv: action.payload } };

      default:
        return state;
    }

  }

}

export default App;