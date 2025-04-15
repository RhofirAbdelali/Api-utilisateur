import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateWelcomeMessage(userName: string) {
  const prompt = `Rédige un court message de bienvenue chaleureux pour un nouvel utilisateur nommé ${userName}. Utilise un ton amical et motivant.`;

  const chatResponse = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  return chatResponse.choices[0].message.content;
}
