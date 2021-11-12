import NowPlaying from './NowPlaying'
import Upcoming from './Upcoming'
import TopRated from './TopRated'
import Popular from './Popular'

const Home = () => {
    return (
      <div className="home-section">
        <NowPlaying/>
        <Upcoming/>
        <TopRated/>
        <Popular/>        
      </div>
    )
}

export default Home
