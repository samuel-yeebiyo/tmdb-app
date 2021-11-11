import { useState } from "react"
import axios from "axios";
import Cards from "./Cards";

const Genre = ({genre}) => {

    const [movies, setMovies] = useState([]);
    

    const getMovies = () => {

        const options = {
            method:'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US', with_genres:`${genre.id}`}
        }

        async function fetch(){
            const data = await axios.request(options);
            console.log(data);
            setMovies(data.data.results)
        }

        fetch()
    }

    return (
        <div className="">
            <p>{genre.name}</p> <button onClick={getMovies}>Get movies</button>
            <div className="movies-container">
                {movies.length > 0 &&
                    movies.map((item)=>(
                        <Cards movie={item}/>
                    ))
                }       
            </div>
        </div>
    )
}

export default Genre
