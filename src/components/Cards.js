import '../css/cards.css'
import { config } from '../utils/tmbd-config' //configuration for tmdb for finding baseurl and image sizes

const Cards = ({movie}) => {

    const image_url = `${config.images.secure_base_url}${config.images.poster_sizes[2]}/${movie.poster_path}`

    return (
        <div className="Cards">
            <img className="movie-image" src={image_url}/>
            <div className="movie-info">
                <p>{movie.id}</p>
                <p>{movie.original_title}</p>
                <p>{movie.release_date}</p>
            </div>
        </div>
    )
}

export default Cards
