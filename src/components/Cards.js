import '../css/cards.css'
import { config } from '../utils/tmbd-config' //configuration for tmdb for finding baseurl and image sizes

const Cards = ({movie}) => {

    const image_url = movie ? `${config.images.secure_base_url}${config.images.poster_sizes[4]}/${movie.poster_path}` : ""

    return (
        <div className="Cards">
        <img className="movie-image" src={image_url}/>
        </div>
    )
}

export default Cards
