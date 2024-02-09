import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body } = req;
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    const response = await axios.post(url, body, { headers: headers });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Something went Wrong" });
  }
}
