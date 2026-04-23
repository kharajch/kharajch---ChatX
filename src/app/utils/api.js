const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const isDev = process.env.NODE_ENV === 'development'

/**
 * Send a message to the backend /api/search endpoint
 * @param {string} message - The user's message
 * @param {Array} history - Previous conversation messages
 * @returns {Promise<{answer: string, thinking: string}>}
 */
export async function sendMessage(message, history = [], onChunk) {
  try {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: history.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.detail || `Server error: ${response.status} ${response.statusText}`
      )
    }

    if (onChunk) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let answer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        answer += chunk
        onChunk(chunk, answer)
      }
      return { answer, thinking: '' }
    } else {
      const text = await response.text()
      return { answer: text, thinking: '' }
    }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        `Unable to connect to the server. ${isDev ? 'Please make sure the backend is running on port 8000.' : 'Please check your backend deployment.'}`
      )
    }
    throw error
  }
}

/**
 * Health check for the backend API
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/`)
    return response.ok
  } catch {
    return false
  }
}
