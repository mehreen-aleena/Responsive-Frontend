import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, firstName: "Martina", role: "admin" },
    { id: 2, firstName: "Shona", role: "developer" }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const { firstName, role } = req.body;

    if (!firstName || !role) {
        return res.status(400).json({ error: "Bad Request", message: "Missing fields!" });
    }

    const allowedRoles = ['admin', 'developer', 'intern'];
    if (!allowedRoles.includes(role.toLowerCase())) {
        return res.status(400).json({ error: "Bad Request", message: "Invalid role!" });
    }

    const newUser = { id: users.length + 1, firstName: firstName.trim(), role: role.toLowerCase() };
    users.push(newUser);

    res.status(201).json({ message: "User successfully integrated.", user: newUser });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});