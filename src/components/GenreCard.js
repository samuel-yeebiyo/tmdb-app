import { useEffect, useState } from 'react'
import {images} from '../data/genre-images'

const GenreCard = ({genre, select}) => {

    const [image, setImage] = useState('')

    useEffect(()=>{
        images.some((item, index)=>{
            if (Object.keys(item)[0] == genre.name){
                setImage(Object.values(images[index])[0])
            }
        })
        if(genre.name == "Action"){
            select(genre.id, genre.name)
        }

    },[])

    const genres = document.querySelectorAll('.genres');

    genres.forEach((item,index)=>{
        
        

        item.addEventListener('click', ()=>{
            
            if(!item.classList.contains("active")){
                //clear from other divs
                genres.forEach((item)=>{
                    if(item.classList.contains("active")){
                        item.classList.remove("active")
                    }
                })

                item.classList.add("active")
            }
        })
    })

    const style={
        background: `url(${image})`, 
    }
    return (
        <div style={style} className="genres" onClick={()=> select(genre.id, genre.name)}>
            <p>{genre.name.toUpperCase()}</p>
        </div>
    )
}

export default GenreCard
