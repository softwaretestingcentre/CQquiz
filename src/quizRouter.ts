import express from 'express';
import path from 'path';

const router = express.Router();

// Serve the quiz.html file
router.get('/', (request, resource) => {
    // Serve quiz.html from src directory
    resource.sendFile(path.resolve(__dirname, 'quiz.html'));
});

export default router;
