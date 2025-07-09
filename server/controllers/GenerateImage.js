import * as dotenv from "dotenv";
import { createError } from "../error.js";
import axios from "axios";

dotenv.config();

export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
            return next(createError(400, "Prompt is required and must be a non-empty string."));
        }

        const apiKey = process.env.STABILITY_API_KEY;
        if (!apiKey) {
            return next(createError(500, "Stability API key not set."));
        }

        const response = await axios.post(
            "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
            {
                text_prompts: [{ text: prompt }],
                cfg_scale: 7,
                height: 1024,
                width: 1024,
                samples: 1,
                steps: 30
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                     "Accept": "application/json"
                }
            }
        );

        // The image is in response.data.artifacts[0].base64
        const generatedImage = response.data.artifacts[0].base64;

        return res.status(200).json({ photo: generatedImage });
    } catch (error) {
        console.error("Error generating image:", error);
        if (error.response) {
            console.error("Stability AI error response:", error.response.data);
            const status = error.response.status || 500;
            const message = error.response.data?.message || "Unexpected error with Stability AI API.";
            return next(createError(status, message));
        }
        return next(createError(500, "Internal server error. Please try again later."));
    }
};
