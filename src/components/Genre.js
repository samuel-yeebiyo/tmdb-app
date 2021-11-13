import { useState, useEffect } from "react"
import axios from "axios";

import GenreCard from "./GenreCard";
import Cards from "./Cards";
import NextPage from "./NextPage";
import LoadingCard from './LoadingCard'

import '../css/genre.css'

const Genre = () => {

    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([])
    const [currentId, setCurrentId] = useState('')
    const [current, setCurrent] = useState('')
    const [nextPage, setNextPage] = useState(2)
    
    useEffect(() => {

        const gOptions = {
            method:'GET',
            url: 'https://api.themoviedb.org/3/genre/movie/list',
            params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US'}
        }

        async function getGenres(){
            console.log("Getting genres")
            const data = await axios.request(gOptions);
            setGenre(data.data.genres)
        }

        getGenres()
        
    }, [])

    function remove(){
        if(movies.length > 0){
            setMovies([]);
        }
    }

    const getMovies = (id, name) => {

        if(name !== current){

            remove()

            const options = {
                method:'GET',
                url: 'https://api.themoviedb.org/3/discover/movie',
                params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US', with_genres:`${id}`}
            }

            async function fetch(){
                const data = await axios.request(options);
                console.log(data);
                setMovies(data.data.results)
            }

            setCurrent(name)
            setCurrentId(id)
            setNextPage(2)
            

            fetch()
        }
    }


    const getNext = ()=>{

        const options = {
            method:'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US', with_genres:`${currentId}`, page: nextPage}
        }

        async function fetch(){
            const data = await axios.request(options);
            console.log(data);
            setMovies(prev => prev.concat(data.data.results))
            setNextPage(prev => prev+1)
        }

        fetch()
    }

    return (
        <div className="Genre-container">

            {genre.length > 0 &&
                <div className="genre-wrapper">
                <div className="part one">
                {
                    genre.filter((item,index) => item.name != "TV Movie" && index < 9).map((item, index)=>{
                        return <GenreCard genre={item} select={getMovies}/>
                    })
                }
                </div>
                <div className="part two">
                {
                    genre.filter((item,index) => item.name != "TV Movie" && index >= 9).map((item, index)=>{
                        return <GenreCard genre={item} select={getMovies}/>
                    })
                }
                </div>
                </div>
            }

            <div className="genre-display">
                <p className="genre-name">{current}</p>
                <div className="movies-container">
                    {movies.length > 0 ?
                        movies.map((item)=>(
                            <Cards movie={item}/>
                        )):
                        <LoadingCard number={20}/>
                    }
                    <NextPage next={getNext}/>
                </div>
            </div>
        </div>
    )
}

export default Genre
