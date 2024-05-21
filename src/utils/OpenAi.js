export const sendMsgToAI = async (question) => {
  const API_URL = "/api/v1/genai/q-and-a";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  };
  try {
    const response = await (await fetch(API_URL, requestOptions)).json();
    return response?.response;
  } catch (error) {
    console.log(error);
  }
};
