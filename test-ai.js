const { generateText } = require('ai');
const { createGoogleGenerativeAI } = require('@ai-sdk/google');
const dotenv = require('dotenv');
dotenv.config();

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

async function main() {
    try {
        console.log("Trying gemini-1.5-flash...");
        const result = await generateText({
            model: google('gemini-1.5-flash'),
            prompt: 'Hello, what is your name?',
        });
        console.log("Success with gemini-1.5-flash!", result.text);
    } catch (e) {
        console.error("Error with gemini-1.5-flash:", e.message);
    }

    try {
        console.log("Trying gemini-1.5-flash-latest...");
        const result = await generateText({
            model: google('gemini-1.5-flash-latest'),
            prompt: 'Hello, what is your name?',
        });
        console.log("Success with gemini-1.5-flash-latest!", result.text);
    } catch (e) {
        console.error("Error with gemini-1.5-flash-latest:", e.message);
    }
}
main();
