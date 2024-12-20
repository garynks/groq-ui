import axios from 'axios'

const API_URL = "https://api.groq.com/openai/v1";
const token = process.env.REACT_APP_API_KEY;

const headers = {
    'Authorization': `Bearer ${token}`
}

export const getAvailableModels = async () => {
    return await axios.get(`${API_URL}/models`, { headers })
}

export const sendMessagetoLLM = async (model: string, prompt: string) => {
    const requestBody = {
      model: model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    };
    const response = await axios.post(`${API_URL}/chat/completions`, requestBody, { headers })
    return response.data["choices"][0]["message"]["content"]
}
