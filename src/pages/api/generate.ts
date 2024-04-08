import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';

export default async function generate(req: NextApiRequest, res: NextApiResponse) {
    console.log("[server] Fetching Info from OpenAI");

    // Initialize the OpenAI API with the new API key method
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "gpt-3.5-turbo-instruct", // Updated to the latest available model
            prompt: req.body.toGenerate
        });

        // Send the generated text as the response
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("[server] Authorization failed!");
            res.status(401).json({ error: "Unauthorized request" });
        } else {
            console.error("[server] Error fetching data from OpenAI", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
