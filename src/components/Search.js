import { useState, useEffect} from "react";
import axios from "axios";
import Cards from "./Cards";


const Search = ({query}) => {
    const [movies, setMovies] = useState([]);
    
    useEffect(()=>{
        console.log("Called to search")

        const options = {
            method:'GET',
            url: 'https:///api.themoviedb.org/3/search/movie',
            params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US', page: 1, query: query}
        }

        async function fetch(){
            const data = await axios.request(options);
            console.log(data);
            setMovies(data.data.results)
        }

        fetch()
    }, [query])

    const getMovies = () => {

        
    }

    return (
        <div className="Top sec">
            <p>Search Results</p>
            <div className="movies-container">
                {movies.length > 0 &&
                    movies.filter(item => !!item.poster_path).map((item)=>(
                        <Cards movie={item}/>
                    ))
                }       
            </div>
        </div>
    )
}

export default Search
