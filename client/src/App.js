import React, { useState, useEffect } from "react";
import Axios from 'axios';

export default function App() {
    const [movieName, setMovieName] = useState('');
    const [movieReview, setMovieReview] = useState('');
    const [content, setContent] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:5000/api/get').then((response) => {
            console.log(response.data);
            const tempContent = response.data.map((element) =>
                <li key={element.id}>{`${element.movie_name} | ${element.movie_review}`}</li>
            );
            setContent(tempContent);
        });
    }, []);

    const submitReview = () => {
        Axios.post('http://localhost:5000/api/insert',
            {
                movieName: movieName,
                movieReview: movieReview
            }).then(
                alert('successful insert!')
            );
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>CRUD APP</h1>
            <div className='form' style={{ display: 'flex', flexFlow: 'column nowrap', gap: '9px' }}>
                <label>Movie Name</label>
                <input type='text' name='movieName' onChange={(e) => setMovieName(e.target.value)} />
                <label>Movie Review</label>
                <input type='text' name='movieReview' onChange={(e) => setMovieReview(e.target.value)} />
                <button onClick={submitReview}>Submit</button>
            </div>

            <ul>
                {content !== undefined ? content : ''}
            </ul>
        </div>
    )
}