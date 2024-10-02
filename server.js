const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();

const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;
const apiBaseUrl = process.env.API_BASE_URL;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Endpoint to get the list of languages
app.get('/api/list-languages', async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/listlanguages`, {
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching language list:', error);
        res.status(500).json({ error: 'Failed to fetch language list' });
    }
});

// Endpoint to translate text
app.post('/api/translate-text', async (req, res) => {
    const { text, sourcelanguage, targetlanguage } = req.body;

    try {
        const response = await axios.get(`${apiBaseUrl}/translatetext?text=${encodeURIComponent(text)}&sourcelanguage=${sourcelanguage}&targetlanguage=${targetlanguage}`, {
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ error: 'Failed to translate text' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
