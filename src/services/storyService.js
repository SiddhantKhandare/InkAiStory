import { GEMINI_API_KEY } from '@env';

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

async function getSupportedModel() {
  const res = await fetch(
    `${BASE_URL}/models?key=${GEMINI_API_KEY}`
  );
  const data = await res.json();

  const model = data.models.find(m =>
    m.supportedGenerationMethods?.includes('generateContent')
  );

  return model.name;
}

export const generateStory = async (prompt) => {
  const modelName = await getSupportedModel();

  const response = await fetch(
    `${BASE_URL}/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Write a creative story in maximum 10 short paragraphs.

Story prompt: ${prompt}`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message);
  }

  const storyText = data.candidates[0].content.parts[0].text;

  const pages = storyText
    .split('\n')
    .filter(t => t.trim())
    .slice(0, 10)
    .map((t, i) => ({
      page: i + 1,
      content: t.trim(),
    }));

  return pages;
};
