import { GoogleGenerativeAI } from '@google/generative-ai';

interface Props {
  topic: string;
  type: string;
  amount: number;
}

export async function generateQuestion({ topic, type, amount }: Props) {
  try {
    const prompt = `
      Generate ${amount} quiz questions based on the topic: "${topic}".
      The quiz should include ${type === 'mcq' ? 'four options for each question and the correct answer.' : 'a True/False answer.'}
      The generated questions should adhere to the following format:
      {
        "questions": [
          {
            "question": "string",
            ${
              type === 'mcq'
                ? `
            "options": ["option1", "option2", "option3", "option4"],
            "answer": "string"`
                : `
            "options": ["True", "False"],
            "answer": "string"
            `
            }
          }
        ]
      }
    `;

    const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_AI_API_KEY}`);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);

    const rawResponse = result.response.text();
    const cleanedResponse = rawResponse
      .trim()
      .replace(/```json|```/g, '')
      .trim();

    try {
      const parsedResponse = JSON.parse(cleanedResponse);

      if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
        throw new Error('Invalid response format: Missing or incorrect "questions" property.');
      }

      return parsedResponse;
    } catch (error) {
      console.error('Error parsing JSON:', error, 'Raw response:', cleanedResponse);
      return { error: 'Failed to parse the response into valid JSON.' };
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    return { error: 'Failed to generate questions. Please try again.' };
  }
}
