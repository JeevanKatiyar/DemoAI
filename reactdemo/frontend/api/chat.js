import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { model, messages } = req.body;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    const body = JSON.stringify({ model, messages });

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: headers,
          body: body,
        }
      );

      const data = await response.json();
      res.status(200).json(data); // Respond with OpenAI data
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to fetch response from OpenAI" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" }); // Handle non-POST requests
  }
}
