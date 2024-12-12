const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');
const Web3 = require('web3');

dotenv.config();  

const app = express();
const port = process.env.PORT || 3110;

app.use(cors());  
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
    res.send('E-Voting Backend');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.post('/register', (req, res) => {
    const { aadhar, name } = req.body;

    const query = 'INSERT INTO users (aadhar, name) VALUES (?, ?)';
    db.query(query, [aadhar, name], (err) => {
        if (err) {
            res.status(500).send('Error during registration');
            return;
        }
        res.send('Registration successful');
    });
});

app.post('/login', (req, res) => {
    const { aadhar } = req.body;
    console.log(aadhar);
    const query = 'SELECT has_voted FROM users WHERE aadhar = ?';
    db.query(query, [aadhar], (err, results) => {
        if (err) {
            res.status(500).send('Error during login');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        const has_voted = results[0].has_voted;
        res.json({ has_voted });
  });
});

app.post('/mark_voted', (req, res) => {
    const { aadhar } = req.body;

    const query = 'UPDATE users SET has_voted = TRUE WHERE aadhar = ?';
    db.query(query, [aadhar], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error updating voting status');
            return;
        }

        res.send('Vote recorded. User marked as having voted.');
    });
});