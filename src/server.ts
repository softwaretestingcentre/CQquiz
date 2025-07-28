import express from 'express';
import path from 'path';

import quizRouter from './quizRouter';

const app = express();
const PORT = 3000;

// Serve static files (for quiz.html and assets)
app.use(express.static(path.join(__dirname)));

// Use the quiz router for the root path
app.use('/', quizRouter);

app.listen(PORT, () => {
    console.log(`Quiz app listening at http://localhost:${PORT}`);
});
