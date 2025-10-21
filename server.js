const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Snaption API Server Running' });
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString('base64'),
        mimeType: req.file.mimetype,
      },
    };

    const platform = req.body.platform || 'instagram';
    const tone = req.body.tone || 'balanced';
    const language = req.body.language || 'english';
    
    const toneInstructions = {
      balanced: 'balanced and versatile tone',
      playful: 'fun, energetic, and playful tone with emojis',
      professional: 'professional, formal, and business-appropriate tone',
      bold: 'confident, assertive, and attention-grabbing tone'
    };

    const languageInstructions = {
      english: 'in English',
      hindi: 'in Hindi (हिंदी) using Devanagari script',
      marathi: 'in Marathi (मराठी) using Devanagari script',
      spanish: 'in Spanish (Español)',
      french: 'in French (Français)',
      german: 'in German (Deutsch)',
      japanese: 'in Japanese (日本語)',
      korean: 'in Korean (한국어)',
      chinese: 'in Chinese (中文)',
      arabic: 'in Arabic (العربية)',
      portuguese: 'in Portuguese (Português)'
    };

    const prompt = `Analyze this image with a ${toneInstructions[tone]} and provide ALL responses ${languageInstructions[language]}:
    1. Keywords (5-8 relevant keywords)
    2. Vibe/Mood (describe the overall feeling)
    3. Instagram Caption (engaging, with emojis and hashtags, ${toneInstructions[tone]}, ${languageInstructions[language]})
    4. LinkedIn Caption (professional, suitable for business networking, ${toneInstructions[tone]}, ${languageInstructions[language]})
    5. Dominant Colors (identify 3-5 main colors in the image and provide their HEX color codes like #FF5733, #33A1FF)
    6. Objects (identify main objects/subjects in the image)

    8. Quality/Confidence score (0.0-1.0 based on image clarity, composition, lighting, focus, and overall visual appeal)
    9. Best posting times - analyze the image content and suggest optimal posting times:
       - For lifestyle/food/travel content: Instagram peak hours vary
       - For business/professional content: LinkedIn business hours work best
       - Consider the image type, target audience, and content category
    10. Reading Grade - analyze the caption complexity and vocabulary to determine appropriate reading level (Grade 3-12 or College)
    11. Alt text description for accessibility (MANDATORY: Always provide a detailed description of what's in the image for screen readers, ${languageInstructions[language]})
    12. Target audience based on image content (${languageInstructions[language]})
    
    Format your response as JSON:
    {
      "keywords": ["keyword1", "keyword2", ...],
      "vibe": "description of mood/vibe",
      "instagramCaption": "caption with emojis and hashtags",
      "linkedinCaption": "professional caption",
      "colors": ["#FF5733", "#33A1FF", "#28A745"],
      "objects": ["object1", "object2", "object3"],

      "confidence": [CALCULATED_SCORE_0_TO_1],
      "bestTimeToPost": {
        "instagram": "[DYNAMIC_TIME_BASED_ON_CONTENT]",
        "linkedin": "[DYNAMIC_TIME_BASED_ON_CONTENT]"
      },
      "altText": "Descriptive alt text for accessibility",
      "audience": ["target1", "target2"],
      "safety": { "nsfw": false, "sensitive": false, "brandSafe": true },
      "readingGrade": "[CALCULATED_GRADE_LEVEL]",

    }`;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    // Extract and clean JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      let jsonStr = jsonMatch[0];
      // Remove any trailing commas before closing braces/brackets
      jsonStr = jsonStr.replace(/,\s*([}\]])/g, '$1');
      const analysis = JSON.parse(jsonStr);
      res.json(analysis);
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});