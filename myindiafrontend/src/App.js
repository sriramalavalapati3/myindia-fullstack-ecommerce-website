import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from './Views/HomePage';
import Navbar from './Components/Navbar';

import Cart from './Views/Cart';
import ProductPage from './Views/ProductPage';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/Dashboard' element={
              <Navbar>
                <HomePage />

             
              </Navbar>
            }
          />
          <Route
            path='/yourCart' element={
              <Navbar>
                <Cart />

             
              </Navbar>
            }
          />
          <Route
            path='/product/:id' element={
              <Navbar>
                <ProductPage />

            
              </Navbar>
            }
          />

          <Route
            path='/' element={<SignUp />}
          />

          <Route
            path='/signIn' element={<Login/>}
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
