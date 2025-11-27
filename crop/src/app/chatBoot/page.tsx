'use client'
import React, { useState } from "react";
import { UploadCloud, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIResult {
  crop: string;
  disease: string | null;
  confidence: number;
  recommendation: string;
}

export default function CropAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AIResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setResult(null);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setResult(null);

    try {
      // Replace this with actual AI API call
      // Example: send file to backend endpoint /api/analyze
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data: AIResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze crop image.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
        🌱 Crop AI Analysis
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
        Upload a photo of your crop, and our AI will detect the type of crop, identify any diseases, 
        and provide recommendations to improve crop health.
      </p>

      {/* Upload Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        {/* Preview */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Selected Crop"
            className="w-full h-64 object-cover rounded-xl mb-4 border border-green-100"
          />
        ) : (
          <div className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-xl mb-4 text-green-400">
            <UploadCloud className="w-12 h-12 mb-2" />
            <p className="text-center">Drag & drop or click to upload a crop photo</p>
          </div>
        )}

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        {/* Upload Button */}
        <Button
          
          className="w-full flex items-center justify-center gap-2"
          onClick={handleUpload}
          disabled={!selectedFile || loading}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Analyze Crop"}
        </Button>

        {/* Result */}
        {result && (
          <div className="mt-6 w-full bg-green-50 border border-green-200 rounded-2xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              {result.crop} Analysis
            </h2>
            <p className="text-gray-700 mb-1">
              Disease:{" "}
              {result.disease ? (
                <span className="text-red-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> {result.disease}
                </span>
              ) : (
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Healthy
                </span>
              )}
            </p>
            <p className="text-gray-700 mb-1">
              Confidence: <span className="font-semibold">{result.confidence}%</span>
            </p>
            <p className="text-gray-700">
              Recommendation: <span className="font-medium">{result.recommendation}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
