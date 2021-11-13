import { useState, useEffect} from "react";
import axios from "axios";
import Cards from "./Cards";
import LoadingCard from './LoadingCard'


const Popular = () => {
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        const options = {
            method:'GET',
            url: 'https://api.themoviedb.org/3/movie/popular',
            params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US', page: 1}
        }
        
        async function fetch(){
            const data = await axios.request(options);
            console.log(data);
            setMovies(data.data.results)
        }

        fetch()
    },[])


    return (
        <div className="Popular sec">
            <p>Popular Movies</p>
            <div className="movies-container">
                {movies.length > 0 ?
                    movies.map((item)=>(
                        <Cards movie={item}/>
                    )):
                    <LoadingCard number={10}/>
                }       
            </div>
        </div>
    )
}

export default Popular
