import { useState, useEffect } from 'react'
import {Route, Routes, Link} from 'react-router-dom'
import axios from 'axios'

import './css/App.css';
import Cards from './components/Cards'
import Genre from './components/Genre';
import Search from './components/Search';
import Home from './components/Home';
import Info from './components/Info';

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
          <div className="menus">
            <Link to="/" onClick={()=>{setQuery('')}}>
              <div className="logo"></div>
            </Link>
          </div>
          <div className="search">
            <input placeholder="Search" value={query} onChange={handleQuery}/>
            <Link to="/genres" onClick={()=>{setQuery('')}}>Genres</Link>
          </div>
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
