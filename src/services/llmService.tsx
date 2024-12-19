import axios from 'axios'

const API_URL = 'http://localhost:5000'

export const getAvailableModels = async () => {
    return await axios.get(`${API_URL}/models`)
}

export const sendMessagetoLLM = async (model: string, prompt: string) => {
    const response = await axios.post(`${API_URL}/llm`, { model, prompt })
    return response.data["choices"][0]["message"]["content"]
}
