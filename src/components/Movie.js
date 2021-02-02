import React from 'react';

const Movie = (props)=>{
    return(
        <div className='movie-container'>
            <img src={props.image} alt={props.title} onError={props.error} />
            <div className='movie-details'>
               <h3>{props.title}</h3>
               <p>{props.year}</p>
               <p>{props.director}</p>
            </div>
            <div>
            <span onClick={props.favorite} className={props.class}>☆</span>
            </div>
        </div>
    )
}

export default Movie