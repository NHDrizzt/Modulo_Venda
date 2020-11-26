//import logo from './logo.svg';
import React from 'react'
import data from './data'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import './index.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import { useSelector } from 'react-redux';
import ProductsScreen from './Screens/CreateProduct';
import PaymentScreen from './Screens/Pagamento';
import PlaceOrderScreen from './Screens/Order';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';



function App() {

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

  const openMenu = () => {
      document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                {/* <button onClick={openMenu}>
                    &#9776;
                </button> */}
                <Link to="/">ShopFy</Link>
            </div>
            <div className="header-links">
                <Link to="/cart/">Carrinho</Link>
              
                {
                  userInfo ? <Link> {userInfo.name}</Link> :
                  <Link to="/signin">Cadastre-se</Link>
                }
                
            </div>
        </header>
        <aside className="sidebar">
          <h3>Categorias ShopFy</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
            <li>
              <a href="App.js">Home</a>
            </li>
          </ul>
        </aside>
        <main className="main">
            <div className="content">
              <Route path="/products" component={ProductsScreen}/>
              <Route path="/product/:id" component={ProductScreen}/>
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/signin" component={SigninScreen} />
              <Route path="/" exact={true}component={HomeScreen} /> 
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/orderhistory" component={OrderHistoryScreen} />
                
            </div>
        </main>
        <footer className="footer">
            ShopFy - CRIAR PRODUTO/EDITAR/DELETAR SO IR NO  /products  -- pra conseguir editar ou deletar tem q estar logado como admin (otherwise n funfa)
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
