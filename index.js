const express   = require('express');
const dotenv    = require('dotenv');
const multer    = require('multer');
const fs        = require('fs');
const path      = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });
const upload = multer({ dest: 'uploads/' });
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Gemini API server is running at http://localhost:${PORT}`);
})
app.post('/api/generate-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        res.json({ output: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
app.post('/api/generate-from-file', upload.single('file'), async (req, res) => {
    const prompt = req.body.prompt || "Describe the file";
    const file  = filToGenerativePart(req.file.path, req.file.mimetype);

    try {
        const result = await model.generateContent([prompt, file]);
        const response = result.response;
        res.json({ output: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        fs.unlinkSync(req.file.path);
    }
})
const filToGenerativePart = (filePath, mimeType) => ({
    inlineData: {
        data:
        fs.readFileSync(filePath).toString('base64'), // Read the file and convert it to base64,
        mimeType: mimeType // Set the MIME type of the file
    }
})
app.post('/api/generate-from-audio', upload.single('audio'), async (req, res) => {
    const audioBuffer = fs.readFileSync(req.file.path);
    const base64Audio = audioBuffer.toString('base64');
    const audioPart = {
        inlineData: {
            data: base64Audio,
            mimeType: req.file.mimetype
        }
    }
    const { prompt } = req.body;

    try {
        const result = await model.generateContent([prompt, audioPart]);
        const response = result.response;
        res.json({ output: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        fs.unlinkSync(req.file.path);
    }
})


// async function run() {
//     const prompt = 'Tell me about Golang';

//     const response = await model.generateContent(prompt);
//     let result = response.response;
//     result = result.text();

    // console.log(result);
// }

// run();
