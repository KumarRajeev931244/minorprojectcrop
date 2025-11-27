// app/api/chat/analyze/route.ts

import { NextResponse } from "next/server";
import fs from "fs";
import formidable from "formidable";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false, // Required for file upload
  },
};

// The URL of your ML Model API
const PREDICTOR_URL = process.env.PREDICTOR_URL || "http://localhost:5000/predict";

export async function POST(req: Request) {
  try {
    // ---- STEP 1: Parse the uploaded image (multipart form-data) ----
    const form = formidable({ multiples: false });

    const { files }: any = await new Promise((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const uploadedFile = files.image;

    if (!uploadedFile) {
      return NextResponse.json(
        { error: "No image uploaded." },
        { status: 400 }
      );
    }

    // ---- STEP 2: Read the file into a buffer ----
    const buffer = fs.readFileSync(uploadedFile.filepath);

    // ---- STEP 3: Send image to AI Model Server ----
    const formData = new FormData();
    formData.append(
      "image",
      buffer,
      uploadedFile.originalFilename || "crop.jpg"
    );

    const aiResponse = await fetch(PREDICTOR_URL, {
      method: "POST",
      body: formData as any,
    });

    if (!aiResponse.ok) {
      return NextResponse.json(
        { error: "Error connecting to AI model." },
        { status: 502 }
      );
    }

    // ---- STEP 4: Get prediction from AI Model ----
    const result = await aiResponse.json();

    // ---- STEP 5: Create a user-friendly response ----
    const text =
      result.text ||
      `Detected Crop: ${result.crop}. Disease: ${
        result.disease || "None"
      }.`;

    // ---- STEP 6: Send back response to frontend ----
    return NextResponse.json(
      {
        crop: result.crop,
        disease: result.disease,
        confidence: result.confidence,
        suggestion: result.suggestion,
        text,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while analyzing image:", error);
    return NextResponse.json(
      { error: "Server error while processing image." },
      { status: 500 }
    );
  }
}
