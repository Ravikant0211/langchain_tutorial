import { ChatOpenAI } from "@langchain/openai"
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';

import readline from 'readline';
import dotenv from "dotenv";

dotenv.config(); // Loads .env file into process.env

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// function to take user input
const takeUserInput = async function () {
    return new Promise(resolve => {
        rl.question('User: ', (input) => {
            resolve(input);
        });
    })
}

// Create a LLM Model instance
const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    apiKey: OPENAI_API_KEY
});

const chatHistory = [
    new SystemMessage("You are a helpful assistant.")
];

while (true) {
    const userInput = await takeUserInput();

    if (userInput.toLowerCase() === 'exit') {
        rl.close(); // close the readline interface
        break; // Exit the loop if user types 'exit'
    }

    // Add user input to chat history
    chatHistory.push(new HumanMessage(userInput));

    // Invoke the LLM with the chat history
    const result = await llm.invoke(chatHistory);

    // Log the AI response
    console.log("AI:", result.content);
    
    // Add AI response to the chat history
    chatHistory.push(new AIMessage(result.content));
}

// Print the chat history
console.log("---- Chat History ----");
console.log(chatHistory.map(msg => `${msg.content}`).join('\n'));
