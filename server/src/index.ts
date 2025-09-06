import express from 'express';

const app = express();
const port = 3000; // Or any port, e.g., 5000 to avoid conflict with Next.js

app.use(express.json()); // Enable JSON parsing for POST requests

app.get('/', (req, res) => {
  res.send('Hello from KKW Web Park Backend!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});