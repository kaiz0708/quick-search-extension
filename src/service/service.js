/** @format */
import axios from "axios";

export async function callGPT4HandleText(prompt) {
   const API_URL = "https://api.openai.com/v1/chat/completions";

   const content = process.env.REACT_APP_API_OPEN_AI_PROMOPT + " " + prompt;

   const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

   try {
      const response = await axios.post(
         API_URL,
         {
            model: "gpt-4o",
            messages: [
               { role: "system", content: "You are a helpful assistant." },
               { role: "user", content: content },
            ],
            max_tokens: 150,
            temperature: 0.7,
         },
         {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${API_KEY}`,
            },
         }
      );
      return response.data.choices[0].message.content;
   } catch (error) {
      console.error("Error calling GPT-4 API:", error.response ? error.response.data : error.message);
      return null;
   }
}

export async function callGPT4HandleImage(base64Img) {
   const content = process.env.REACT_APP_API_OPEN_AI_PROMOPT_IMG;
   const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
   try {
      const response = await axios.post(
         "https://api.openai.com/v1/chat/completions",
         {
            model: "gpt-4o",
            messages: [
               {
                  role: "system",
                  content: "You are a helpful assistant. When analyzing images, focus on describing key details and providing clear, accurate descriptions.",
               },
               {
                  role: "user",
                  content: [
                     {
                        type: "text",
                        text: content,
                     },
                     {
                        type: "image_url",
                        image_url: {
                           url: base64Img,
                        },
                     },
                  ],
               },
            ],
            max_tokens: 1000,
            temperature: 0.7,
         },
         {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${API_KEY}`,
            },
         }
      );
      return response.data.choices[0].message.content;
   } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      return null;
   }
}
