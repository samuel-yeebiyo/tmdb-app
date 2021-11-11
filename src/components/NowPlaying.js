import { useState, useRef, useEffect } from 'react'
import axios from 'axios'


import '../css/latest.css'
import { config } from '../utils/tmbd-config'



const NowPlaying = () => {

    const [movie, setMovie] = useState([])
    const [current, setCurrent] = useState(0)
    const autoScroll = useRef()

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Interval called")
          forw()
        }, 8000);
        return () => clearInterval(interval);
      }, [current]);

    const getMovie = () => {


        console.log("Being fetched")

        const options = {
            method:'GET',
            url: 'https://api.themoviedb.org/3/movie/now_playing',
            params: {api_key: process.env.REACT_APP_API_KEY, language: 'en-US'}
        }

        async function fetch(){
            const data = await axios.request(options);
            console.log(data);
            setMovie(data.data.results)
        }

        fetch()
    }

    const forw = () => {
        if(current+1 > 4){
            console.log("restart")
            setCurrent(0)
        }else setCurrent(prev => prev +1)
    }

    const backw = () => {
        if(current-1 < 0){
            setCurrent(4)
        }else setCurrent(prev => prev -1)
    }
    
    return (
        <div className="NowPlaying">
            
            <h1>Now Playing</h1>
            
            {movie.length > 0 ?
                movie.filter((value, index) => index <5).map((item, index)=>{
                    const image_url = item.backdrop_path ? `${config.images.secure_base_url}${config.images.backdrop_sizes[2]}/${item.backdrop_path}` : ""
                    
                    const after = index+1 > 4 ? 0 : index+1
                    const before = index-1 < 0 ? 4 : index-1

                    const visibility = current == index ? "current" : after == current ? "before" : before == current ? "next" : "";
                    return (
                        <div className={`now-movie ${visibility}`}>
                            <img className="movie-backdrop" src={image_url}/>
                            <div className="about-playing">
                                <h2>{item.original_title}</h2>
                                <p>{item.overview}</p>
                                <p>Released: {item.release_date}</p>
                            </div>
                        </div>  
                    )                  
                })
                :
                <button style={{zIndex:300}} onClick={getMovie}>Get Latest Movie</button>    
            }
            
            <div className="nav-but" style={{right:0}} onClick={forw}>
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/></g></svg>
            </div>
            <div className="nav-but" style={{left:0}} onClick={backw}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/></svg>
            </div>
            

        </div>
    )
}

export default NowPlaying
