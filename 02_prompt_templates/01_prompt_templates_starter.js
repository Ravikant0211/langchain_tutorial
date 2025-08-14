import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from '@langchain/core/prompts';

import dotenv from "dotenv";

dotenv.config();

const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    openAIApiKey: process.env.OPENAI_API_KEY,
});

// const template = `Write a {tone} email to company {company} expressing interest in the {position} position, mentioning {skill} as a key strength. Keep it to 4 lines maximum.`;

// const promptTemplate = ChatPromptTemplate.fromTemplate(template);

// const prompt = await promptTemplate.invoke({
//     tone: "professional",
//     company: "Tech Innovations Inc.",
//     position: "Software Engineer",
//     skill: "problem-solving"
// });

// Prompt with System Message and Human Message
const messages = [
    ["system", "You are a comedian who tell jokes about the topic {topic}."],
    ["human", "Tell me {jokeCount} jokes."]
];

const promptTemplate = ChatPromptTemplate.fromMessages(messages);

const prompt = await promptTemplate.invoke({
    topic: "Lawyers",
    jokeCount: 3
});

const result = await llm.invoke(prompt);

console.log(result.content);