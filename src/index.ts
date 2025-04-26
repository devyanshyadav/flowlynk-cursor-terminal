import createLynk from 'flowlynk';
import dotenv from 'dotenv';
import cursorTool from './cursor-tools';
import { cursorPrompt } from './cursor-prompt';
import cursorExamples from './cursor-examples';
dotenv.config();


const lynk = createLynk({
    apiKey: process.env.GEMINI_API_KEY || '',
    model: 'gemini-2.0-flash',
    tools: cursorTool,
    examples: cursorExamples,
    url: "https://generativelanguage.googleapis.com/v1beta/openai",
    userSystemPrompt: cursorPrompt,
});

//For terminal input
const lynkTerminal = async () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.question('Welcome to Cursor Terminal (made with using Flowlynk): \n What do you want to build? ', (answer: string) => {
        readline.close();
        lynk.run(answer, (step) => {
            console.log(step);
        });
    });
}
lynkTerminal()