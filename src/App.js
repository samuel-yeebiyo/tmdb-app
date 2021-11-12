import { useState, useEffect } from 'react'
import {Route, Routes, Link} from 'react-router-dom'
import axios from 'axios'

import './css/App.css';
import Cards from './components/Cards'
import Genre from './components/Genre';
import Search from './components/Search';
import Home from './components/Home';

function App() {

  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([])
  const [latest, setLatest] = useState({})

  useEffect(()=>{
      handleSearch()
  },[])


  const handleSearch = ()=>{

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular',
      params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US', page:1},
    }

    const latestOption = {
      method:'GET',
      url: 'https://api.themoviedb.org/3/movie/latest',
      params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US'}
    }

    async function autoComplete(){
      const data = await axios.request(options);
      console.log(data)
      setOptions(data.data.results)
    }

    

    async function getLatest(){
      const data = await axios.request(latestOption);
      console.log(data)
      setLatest(data.data)
    }
    

  }

  const handleQuery = (e)=>{
    setQuery(e.target.value);
  }


  return (
    <div className="App">


      <div className="nav">
        <div className="wrapper">
          <Link to="/">
            <div className="logo"></div>
          </Link>
          <div className="links">
            <Link to="/genres">Genres</Link>
          </div>
          <div className="search">
            <input placeholder="Search" value={query} onChange={handleQuery}/>
          </div>
        </div>
      </div>
      
      
      {query.length < 3 && 
        <Routes>
          <Route path="/" exact element={ <Home />}/>
          <Route path="/genres" exact element={ <Genre/> }/>
        </Routes>
      }
      

    </div>
  );
}

export default App;
