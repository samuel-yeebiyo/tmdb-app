import { useState, useEffect } from 'react';

import '../css/cards.css'
import { config } from '../utils/tmbd-config' //configuration for tmdb for finding baseurl and image sizes

import Info from './Info';


const Cards = ({movie}) => {

    const [active, setActive] = useState(false)

    const toggle = ()=>{
        console.log("Pressed")
        window.document.body.classList.toggle("prevent")
        setActive(prev => !prev)
    }

    const image_url = movie ? `${config.images.secure_base_url}${config.images.poster_sizes[4]}/${movie.poster_path}` : ""

    return (
        <div className="Cards" onClick={()=>toggle()}>
            <img className="movie-image" src={image_url}/>
            {active === true &&
                <Info movie={movie} close={toggle}/>
            }
            
        </div>
    )
}

export default Cards
