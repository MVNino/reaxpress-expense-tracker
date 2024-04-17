import express from "express";
import mysql from "mysql2";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'expenses',
    user: 'root',
    password: '',
})

connection.connect((error) => {
    if (error) {
        throw new Error('DB connection error : ', error)
    }

    console.log('Success!')
})

app.get("/api/expenses", (request, response) => {
    connection.query('SELECT * FROM expenses;', (error, results) => {
        if (error) {
            return response.status(500).json({ error })
        }

        response.json({ data: results })
    })
});

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
