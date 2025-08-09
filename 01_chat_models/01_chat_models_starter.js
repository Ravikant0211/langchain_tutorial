import { ChatOpenAI } from "@langchain/openai"
import dotenv from "dotenv";

dotenv.config(); // Loads .env file into process.env

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    apiKey: OPENAI_API_KEY
});

llm.invoke("What is the square root of 49?").then(response => {
    console.log("LLM:", response.content);
}).catch(error => {
    console.error("Error invoking LLM:", error);
})