import React, { Component } from 'react';
import Movie from './components/Movie';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'


const logo ='https://i.pinimg.com/originals/b3/91/b1/b391b160afbe80b666d9f7201b8eecfc.jpg'

class App extends Component {
   state = {
  movieList: [],
  filterMovies: [],
  favoriteMovies: [],
  genres: [],
  randomTitle: '',
  
  }

  componentDidMount() {
    Axios.get(`https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json`)
      .then((res) => res.data)
      .then((data)=> this.setState({
        movieList: data.movies, 
        genres: data.genres,
        filterMovies: data.movies
      }))
  }

  addDefaultSrc = (ev)=>{
    ev.target.src = logo
  }

  addToFavorites = (movieIndex)=>{
     let list = this.state.movieList;
     let favList = this.state.favoriteMovies;
     let favorite = [...favList];
     (favorite.includes(list[movieIndex].title))
     ?
     alert(`This movie is already in your list!`)
     :
     favorite.push(list[movieIndex].title)
     this.setState({favoriteMovies: favorite})
    
  }

  deleteFromFavorites = (movieIndex)=>{
    let copyOfFav = this.state.favoriteMovies;
    copyOfFav.splice(movieIndex,1);
    this.setState({favoriteMovies: copyOfFav});
   
  }

  pickRandom = ()=>{
    let fav = this.state.favoriteMovies;
    let random = fav[Math.floor(Math.random() * fav.length)];
    let movie = this.state.movieList;
    let chosen = movie.filter(item=>item.title === random)
    
    this.setState({
      randomTitle: chosen[0]
      })
  }

  filterMovies = (ev)=>{
    ev.target.value === 'All'
    ? this.setState({filterMovies: this.state.movieList})
    : this.setState({filterMovies: this.state.movieList.filter(item=>item.genres.includes(ev.target.value))})
  }


  render() {
    return (
      <div className='App'>
      <Router>
          <Switch>
            <Route exact path='/'>
      
             <div>
              <select onChange={this.filterMovies}>
                  <option value='All'>All</option>
        {
          this.state.genres.map(item=><option value={item}>{item}</option>)
        }
               </select>
             </div>
      
              <div>
        { this.state.filterMovies &&
          this.state.filterMovies.map((item,index)=> <Movie 
            title={item.title}
            image={item.posterUrl}
            year={item.year}
            director={item.director}
            error={this.addDefaultSrc}
            key={index}
            favorite={()=>this.addToFavorites(index)}
            class={this.state.favoriteMovies.includes(item.title) ? 'star-active': 'star-inactive'}
            
          />)
        }
              </div>
        
         <div className='fav-board'>
   
            <Link to='/random'>
              <button onClick={this.state.favoriteMovies.length > 0 && this.pickRandom }>PICK</button>
            </Link>

          <h3>Favorites</h3>
        
          {
            this.state.favoriteMovies.map((item,i)=>
            <div className='fav-div'>
              <p key={i}>{item}</p><button onClick={()=>this.deleteFromFavorites(i)}>Delete</button>
              
            </div>
            )
          }
          
        </div>
             </Route>
             <Route exact path='/random'>
        <div className='random-container'>
        <img src={this.state.randomTitle.posterUrl} onError={this.addDefaultSrc} alt='movie'/>
        <h2>{this.state.randomTitle.title}</h2>
        <p>{this.state.randomTitle.year}</p>
        <p>{this.state.randomTitle.plot}</p>
          <Link to='/'><button>Back</button></Link>
        </div>
          
             </Route>
          </Switch>
      </Router>
      </div>
      
    );
  }
}



export default App;
