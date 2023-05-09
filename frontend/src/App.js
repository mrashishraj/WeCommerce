import './App.css';
import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import WebFont from "webfontloader";
import React from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/user/LoginSignUp';
import store from "./redux/store"
import { loadUser } from './redux/actions/userActions';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';

function App() {

  const {isAuthenticated,user} = useSelector((state)=>state.user)

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser())
  },[])


  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Route exact path="/products" component={Products}/>
      <Route path="/products/:keyword" component={Products}/>
      <Route exact path="/Search" component={Search}/>
      <Route exact path="/login" component={LoginSignUp}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
