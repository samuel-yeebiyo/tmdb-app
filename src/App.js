import { useState, useEffect } from 'react'
import {Route, Routes, Link} from 'react-router-dom'
import axios from 'axios'

import './css/App.css';
import Cards from './components/Cards'
import Genre from './components/Genre';
import Search from './components/Search';
import Home from './components/Home';
import Info from './components/Info';

import logo from './assets/logo.svg'

function App() {

  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([])
  const [latest, setLatest] = useState({})
  const [active, setActive] = useState(false)


  const toggle = ()=>{
    console.log("Pressed")
    setActive(prev => !prev)
  }

  const handleQuery = (e)=>{
    setQuery(e.target.value);
  }


  return (
    <div className="App">

      <div className="nav">
        <div className="wrapper">
          <Link to="/" onClick={()=>{setQuery('')}}>
            <div className="logo">
              <img src={logo} alt="tmdb logo"/>
            </div>
          </Link>
          <div className="search">
            <input placeholder="Search" value={query} onChange={handleQuery}/>
          </div>
          <Link to="/genres" onClick={()=>{setQuery('')}}>Genres</Link>
        </div>
      </div>
      
      
      {query.length < 3 ?
        <Routes>
          <Route path="/" exact element={ <Home />}/>
          <Route path="/genres" exact element={ <Genre/> }/>
        </Routes>
        :
        <Search query={query}/>
      }
      
      {active &&
        <Info/>
      }
      


    </div>
  );
}

export default App;
