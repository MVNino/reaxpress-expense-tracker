import express from "express";
import mysql from "mysql2";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const connection = mysql.createConnection({
  host: "127.0.0.1",
  database: "expenses",
  user: "root",
  password: "",
});

connection.connect((error) => {
  if (error) {
    throw new Error("DB connection error : ", error);
  }

  console.log("Connected!");
});

// Get All Expenses
app.get("/api/expenses", (request, response) => {
  connection.query("SELECT * FROM expenses;", (error, results) => {
    if (error) return response.status(500).json({ error });

    response.json({ data: results });
  });
});

// Find expense
app.get("/api/expenses/:id", ({ params }, response) => {
  const { id } = params;

  connection.query(
    "SELECT * FROM expenses WHERE id=?",
    [id],
    (errors, result) => {
      if (errors) return response.status(500).json({ errors });

      if (!result.length)
        return response.status(404).json({ message: "Expense not found." });

      response.json({ data: result });
    }
  );
});

// Create expense
app.post("/api/expenses", ({ body }, response) => {
  const { name, amount } = body;

  connection.query(
    "INSERT INTO expenses(name, amount) value(?, ?)",
    [name, amount],
    (error, result) => {
      if (error) return response.status(500).json({ error });

      response.status(201).json({ message: "Created" });
    }
  );
});

// Update expense
app.put("/api/expenses/:id", ({ params, body }, response) => {
  const { id } = params;

  const { name, amount } = body;

  connection.query(
    "UPDATE expenses SET name=?, amount=? WHERE id=?",
    [name, amount, id],
    (error, result) => {
      if (error) return response.status(500);

      return response.json({ data: result, message: 'Updated' });
    }
  );
});

app.delete('/api/expenses/:id', ({ params }, response) => {
    const { id } = params

    connection.query('DELETE FROM expenses WHERE id=?', [id], (error) => {
        if (error) return response.status(500).json({ error }) 

        return response.json({ message: 'Deleted' })
    })
})

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
