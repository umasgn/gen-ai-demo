const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function convertToEmbeddings(text) {
  const model = GEMINI.getGenerativeModel({
    model: "text-embedding-004",
  });

  const result = await model.embedContent(text);
  return result?.embedding?.values;
}

async function convertToBatchEmbeddings(text) {
  const model = GEMINI.getGenerativeModel({
    model: "text-embedding-004",
  });

  const result = await model.batchEmbedContents(text);
  return result?.embedding;
}

async function getAnswerFromContext(context, prompt) {
  const modelId = "gemini-pro";
  const model = GEMINI.getGenerativeModel({
    model: modelId,
    generationConfig: {
      temperature: 1,
      top_p: 0.95,
      top_k: 64,
      max_output_tokens: 8192,
    },
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: context }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = {
  getAnswerFromContext,
  convertToEmbeddings,
  convertToBatchEmbeddings,
};
