import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar'
import Login from './Components/Login';
import History from './Components/History';
import About from './Components/About';
import Register from './Components/Register';
import Tracker from './Components/Tracker';
import { Route } from 'react-router-dom';
function App() {
  return (
    <>
    <Navbar/>
    <Route exact path = '/'>
      <Home/>
    </Route>
    <Route exact path = '/track'>
      <Tracker/>
    </Route>
    <Route exact path = '/about'>
      <About/>
    </Route>
    <Route exact path = '/history'>
      <History/>
    </Route>
    <Route exact path = '/signin'>
      <Login/>
    </Route>
    <Route exact path = '/signup'>
      <Register/>
    </Route>
    </>
  );
}

export default App;
