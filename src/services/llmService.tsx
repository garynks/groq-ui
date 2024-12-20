import axios from 'axios'

const API_URL = "https://api.groq.com/openai/v1";
const token =  import.meta.env.VITE_API_KEY

const headers = {
    'Authorization': `Bearer ${token}`
}

export const getAvailableModels = async () => {
    const response = await axios.get(`${API_URL}/models`, { headers })
    return response.data["data"].map((model: object) => model["id"])
}

export const sendMessagetoLLM = async (prompt: string, model?:string) => {
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
