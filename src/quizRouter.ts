import express from 'express';
import path from 'path';

const router = express.Router();

// Serve the mind-patterns.html file
router.get('/', (request, resource) => {
    // Serve mind-patterns.html from src directory
    resource.sendFile(path.resolve(__dirname, 'mind-patterns.html'));
});

export default router;
