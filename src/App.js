import { useState, useEffect } from 'react'
import axios from 'axios'

import './css/App.css';
import Cards from './components/Cards'
import NowPlaying from './components/NowPlaying';
import Upcoming from './components/Upcoming';
import TopRated from './components/TopRated'
import Popular from './components/Popular'
import Genre from './components/Genre';
import Search from './components/Search';

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
      <div className="nav">
        <div className="logo"></div>
        <div className="search">
          <input value={query} onChange={handleQuery}/>
          <div onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </div>
        </div>
      </div>

      {query.length < 3 && <NowPlaying/>}
      <div className="home-section">
        {query.length > 2 ? 
          <Search query={query}/>
          :
          <div>
            <Upcoming/>
            <TopRated/>
            <Popular/>
          </div>
        }
        
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
