const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'vcrNfm5cDQ9VT#RHmZbykQ@jA!Jh%WmVF@$Re!KF9FCNaQm6fnenWQ^z4ETR',
    database: 'crud_database',
});

// app.get('/', (req, res) => {
//     const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES ('movie_1', 'DUDE!');"
//     db.query(sqlInsert, (err, result) => {
//         res.send('Hello Yo');
//         console.log(err);
//     });
// });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?, ?);";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;

    const sqlDelete = "DELETE FROM movie_reviews WHERE (id) = ?;";
    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
    });
});

app.put('/api/update', (req, res) => {
    const id = req.body.mid;
    const review = req.body.review;

    const sqlUpdate = "UPDATE movie_reviews SET movie_review = ? WHERE id = ?";
    db.query(sqlUpdate, [review, id], (err, result) => {
        if (err) console.log(err);
    });
})

app.listen(5000, () => {
    console.log('Running on Port 5000');
});