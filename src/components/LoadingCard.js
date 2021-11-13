import '../css/loading.css'

const LoadingCard = ({number}) => {

    const array = [...Array(number).keys()]

    const done = array.map(()=>{
        return (
            <div className="Loading">
                <div className="loading-inside"/>            
            </div>
        )
    })

    return done;
}

export default LoadingCard
