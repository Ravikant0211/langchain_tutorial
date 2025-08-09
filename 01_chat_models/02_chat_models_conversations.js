import { ChatOpenAI } from "@langchain/openai"
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';

import dotenv from "dotenv";

dotenv.config(); // Loads .env file into process.env

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    apiKey: OPENAI_API_KEY
});

const messages = [
    new SystemMessage("You are an expert in social media content strategy."),
    new HumanMessage("Give a short tip to create engaging posts on Instagram."),
];

const result = await llm.invoke(messages);
console.log("LLM Response:", result.content);
