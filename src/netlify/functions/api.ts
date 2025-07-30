// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

// Serve the mind-patterns.html file
router.get('/', (request, resource) => {
    // Serve mind-patterns.html from src directory
    resource.sendFile(path.resolve(__dirname, '../../mind-patterns.html'));
});

api.use("/api/", router);
api.use(express.static(__dirname + '../../'));

export const handler = serverless(api);
