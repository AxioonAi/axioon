import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const city = req.query.city as string;
  const state = req.query.state as string;
  const response = await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}%20${state}&region=BR&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    )
    .then((res) => res)
    .catch((err) => {
      throw new Error(err.message);
    });
  res.status(200).json(response.data);
}
