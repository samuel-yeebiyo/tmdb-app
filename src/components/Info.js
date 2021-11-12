import { useEffect, useRef } from 'react';
import { config } from '../utils/tmbd-config'

import '../css/info.css'

const Info = ({movie, close}) => {

    const content = useRef()

    useEffect(()=>{
        const out = setTimeout(()=>{
            content.current.classList.toggle("show")







        },200)

        return ()=>{
            clearTimeout(out)
        }
    },[])
    

    const image_url = movie ? `${config.images.secure_base_url}${config.images.backdrop_sizes[2]}/${movie.backdrop_path}` : ""

    return (
        <div className="Info" onClick={(e)=>{e.stopPropagation();console.log("Parent")}}>
            <div className="layer" onClick={(e)=>{e.stopPropagation(); close()}} ></div>
            
            <div ref={content} className="content" style={{background: `url(${image_url})`}}>
                <div className="content-overlay-wrapper">
                    <div className="content-overlay"></div>
                    <div className="content-detail">
                        <p className="content-title">{movie.original_title}</p>
                        <p className="content-overview">{movie.overview}</p>
                        <p className="content-rating"><strong>Rating</strong> - {movie.vote_average == 0 ? "No Rating" : `${movie.vote_average}/10`}</p>
                        <p className="content-date"><strong>Release Date</strong> - {movie.release_date}</p>
                    </div>
                    <div className="content-close" onClick={(e)=>{e.stopPropagation(); close()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info

