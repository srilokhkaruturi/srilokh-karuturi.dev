import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { request } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generate(req: NextApiRequest, res: NextApiResponse) {
    console.log("[server] Fetching Info from OpenAI")

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: req.body.toGenerate,
        // temperature: 0.6,
        max_tokens: 1000
    });

    if (completion.status == 401) {
        console.log("[server] Failed! Fetching info from OpenAI")
    }


    return res.status(200).json({ result: completion.data.choices[0].text });




}