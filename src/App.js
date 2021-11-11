import { useState, useEffect } from 'react'
import axios from 'axios'

import './css/App.css';
import Cards from './components/Cards'
import NowPlaying from './components/NowPlaying';
import Upcoming from './components/Upcoming';
import TopRated from './components/TopRated'
import Popular from './components/Popular'
import Genre from './components/Genre';

function App() {

  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([])
  const [genre, setGenre] = useState([])
  const [latest, setLatest] = useState({})

  useEffect(()=>{
      //include the search for popular movies
  },[])


  const handleSearch = ()=>{

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular',
      params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US', page:1},
    }

    const gOptions = {
      method:'GET',
      url: 'https://api.themoviedb.org/3/genre/movie/list',
      params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US'}
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

    async function getGenres(){
      const data = await axios.request(gOptions);
      console.log(data)
      setGenre(data.data.genres)
    }

    async function getLatest(){
      const data = await axios.request(latestOption);
      console.log(data)
      setLatest(data.data)
    }
    
    getGenres()
    //getLatest()

  }

  const handleQuery = (e)=>{
    setQuery(e.target.value);
  }


  return (
    <div className="App">
      <input value={query} onChange={handleQuery}/>
      <button onClick={handleSearch}>Search</button>

      <NowPlaying/>
      <div className="home-section">
        <Upcoming/>
        <TopRated/>
        <Popular/>
      </div>
      

      {genre.length > 0 ? 
          genre.map((genre)=>(
            <Genre genre={genre} />
          ))
        :
        <h4>Genres here</h4>

      }

      <div className="movies-container">
        {options.length > 0 ? 
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
