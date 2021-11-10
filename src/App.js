import { useState, useEffect } from 'react'
import axios from 'axios'

import './css/App.css';
import Cards from './components/Cards';

function App() {

  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([])

  useEffect(()=>{
      //include the search for popular movies
  },[])


  const handleSearch = ()=>{

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular',
      params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US', page:1},
    }

    async function autoComplete(){
      const data = await axios.request(options);
      console.log(data)
      setOptions(data.data.results)
    }
    
    autoComplete()

  }

  const handleQuery = (e)=>{
    setQuery(e.target.value);
  }


  return (
    <div className="App">
      <input value={query} onChange={handleQuery}/>
      <button onClick={handleSearch}>Search</button>
      <div className="movies-container">
        {options.length > 1 ? 
          options.map((item)=>(
            <Cards movie={item}/>
          ))
          :
            <h4>Search for a movie</h4>
        }
      </div>

    </div>
  );
}

export default App;
