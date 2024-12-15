import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

// Setup OpenAI API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        // Validate request input
        if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
            return next(createError(400, "Prompt is required and must be a non-empty string."));
        }

        // Generate the image using OpenAI API
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        // Validate response structure
        if (!response?.data?.data?.[0]?.b64_json) {
            throw new Error("Invalid response from OpenAI API.");
        }

        const generatedImage = response.data.data[0].b64_json;

        // Respond with the generated image
        return res.status(200).json({ photo: generatedImage });
    } catch (error) {
        console.error("Error generating image:", error);

        // Handle specific OpenAI errors
        if (error.response) {
            const status = error.response.status || 500;
            const message = error.response.data?.error?.message || "Unexpected error with OpenAI API.";
            return next(createError(status, message));
        }

        // Handle other errors
        return next(createError(500, "Internal server error. Please try again later."));
    }
};
