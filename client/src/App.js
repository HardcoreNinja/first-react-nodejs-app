import React from "react";

export default function App() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>CRUD APP</h1>
            <div className='form' style={{ display: 'flex', flexFlow: 'column nowrap', gap: '9px' }}>
                <label>Movie Name</label>
                <input type='text' name='movieName' />
                <label>Movie Review</label>
                <input type='text' name='movieReview' />
                <button>Submit</button>
            </div>
        </div>
    )
}