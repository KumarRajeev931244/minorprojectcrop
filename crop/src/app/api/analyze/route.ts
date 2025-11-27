import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false, // important for file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: "Image upload failed." });

    const file = files.image as formidable.File;
    const filePath = file.filepath;

    try {
      // Send to your AI model (replace URL with your ML API endpoint)
      const aiResponse = await axios.post(
        "http://localhost:5000/predict", // Flask/FastAPI backend
        { imagePath: filePath }
      );

      res.status(200).json(aiResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "AI model not responding." });
    } finally {
      fs.unlinkSync(filePath); // cleanup
    }
  });
}
