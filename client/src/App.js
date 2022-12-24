import React, { useState, useEffect } from "react";
import Axios from 'axios';

export default function App() {
    const [movieName, setMovieName] = useState('');
    const [movieReview, setMovieReview] = useState('');
    const [updatedReview, setUpdatedReview] = useState('');
    const [content, setContent] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:5000/api/get').then((response) => {
            console.log(response.data);
            setContent(response.data);
        });
    }, []);

    const submitReview = () => {
        Axios.post('http://localhost:5000/api/insert',
            {
                movieName: movieName,
                movieReview: movieReview
            });

        setContent([...content, { movie_name: movieName, movie_review: movieReview }]);
    };

    const deleteReview = (e) => {
        const id = e.target.id;
        Axios.delete(`http://localhost:5000/api/delete/${id}`);
    }

    const updateReview = (e) => {
        const id = e.target.id;
        console.log(id);

        Axios.put('http://localhost:5000/api/update', { mid: id, review: updatedReview, });
        setUpdatedReview('');
    }

    return (
        <div style={{ textAlign: 'center', placeContent: 'center center' }}>
            <h1>CRUD APP</h1>
            <div className='form' style={{ display: 'flex', flexFlow: 'column nowrap', gap: '9px' }}>
                <label>Movie Name</label>
                <input type='text' name='movieName' onChange={(e) => setMovieName(e.target.value)} />
                <label>Movie Review</label>
                <input type='text' name='movieReview' onChange={(e) => setMovieReview(e.target.value)} />
                <button onClick={submitReview}>Submit</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', placeContent: 'center center' }}>
                {content.map((value) =>
                    <div key={value.id} style={{ display: 'flex', flexFlow: 'column nowrap', padding: '10px', border: '1px solid black' }}>
                        <h1>{`${value.movie_name}`}</h1>
                        <p>{`${value.movie_review}`}</p>
                        <input type='text' onChange={(e) => setUpdatedReview(e.target.value)} />
                        <button id={value.id} onClick={updateReview}>Update</button>
                        <button id={value.id} onClick={deleteReview}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    )
}