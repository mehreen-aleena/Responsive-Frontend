import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// 1. Database Connection Setup
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Database error:", err.message);
    else console.log("Connected to SQLite database.");
});

// 2. Table Schema Design (Pillar 1)[span_1](start_span)[span_1](end_span)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            role TEXT NOT NULL
        )
    `);
});

// 3. READ Operation (HTTP GET) - Database se data lana[span_2](start_span)[span_2](end_span)
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 4. CREATE Operation (HTTP POST) - Database mein data save karna[span_3](start_span)[span_3](end_span)
app.post('/users', (req, res) => {
    const { firstName, role } = req.body;

    if (!firstName || !role) {
        return res.status(400).json({ error: "Bad Request", message: "Missing fields!" });
    }

    const allowedRoles = ['admin', 'developer', 'intern'];
    if (!allowedRoles.includes(role.toLowerCase())) {
        return res.status(400).json({ error: "Bad Request", message: "Invalid role!" });
    }

    // Parameterized Query use ki hai SQL Injection se bachne ke liye (Pillar 4)[span_4](start_span)[span_4](end_span)
    const query = "INSERT INTO users (firstName, role) VALUES (?, ?)";
    db.run(query, [firstName.trim(), role.toLowerCase().trim()], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, firstName, role });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});