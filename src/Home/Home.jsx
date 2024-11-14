import React from 'react';
import './Home.css';
import Navbar from '../components/Navbar/Navbar';
import hero_banner from '../assets/hero_banner.jpg';
import hero_title from '../assets/hero_title.png';
import play_icon from '../assets/play_icon.png';
import info_icon from '../assets/info_icon.png';
import TitleCards from '../components/TitleCards/TitleCards';
import Footer from '../components/Footer/Footer';

const Home = () => {

    const apiUrl = import.meta.env.VITE_OMDB_API_KEY;

  return (
    <div className='home'>
        <Navbar/>
        <div className="hero">
          <img className='banner-img' src={hero_banner} alt="" />
          <div className="hero-caption">
            <img className='caption-img' src={hero_title} alt="" />
            <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
            <div className="hero-btns">
              <button className='btn'><img src={play_icon} alt="" />Play</button>
              <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
            </div>
          </div>
        </div>
        <div className='more-cards'>
            <TitleCards title={"Only on Netflix"} movies={["Inception", "The Matrix", "Avatar", "Avatar: The Way of Water", "Avengers","Avengers: Infinity War","Avengers: Age of Ultron","Avengers: Endgame","Guardians of the Galaxy", "Titanic", "Interstellar", "Pearl Harbor", "Gravity"]}/>
            <TitleCards title={"Topics For You"} apiURL={`http://www.omdbapi.com/?s=crime&y=2021&plot=full&apikey=${apiUrl}`}/>
            <TitleCards title={"Blockbuster movies"} apiURL={`https://www.omdbapi.com/?s=mission&type=movie&plot=full&page=1&r=json&apikey=${apiUrl}`}/>
            <TitleCards title={"Upcoming"} apiURL={`https://www.omdbapi.com/?s=harry&type=movie&plot=full&apikey=${apiUrl}`}/>
        </div>
        <Footer/>
    </div>
  );
}

export default Home;
