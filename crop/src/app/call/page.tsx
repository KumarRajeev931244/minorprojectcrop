'use client'
import React, { useState } from "react";
import { Phone, PhoneOff, User, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function CallingFeaturePage() {
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleCall = () => {
    setIsCalling(true);
    console.log("Starting call...");
    // 🔗 TODO: integrate with WebRTC / Twilio API for real call
  };

  const handleEndCall = () => {
    setIsCalling(false);
    console.log("Call ended");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex flex-col items-center justify-center text-gray-800 p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-green-700 mb-2">📞 AI Assistance Calling</h1>
      <p className="text-gray-600 mb-10 text-center max-w-lg">
        Connect instantly with our agricultural experts or AI assistant for help with crop diseases, fertilizers, and field management.
      </p>

      {/* Call UI Card */}
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-8 text-center">
        {!isCalling ? (
          <>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <User className="w-12 h-12 text-green-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">CropAI Expert</h2>
              <p className="text-gray-500 mb-6">Available for consultation</p>
              <Button
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleCall}
              >
                <Phone className="w-5 h-5" /> Start Call
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <User className="w-12 h-12 text-green-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">On Call with Expert</h2>
              <p className="text-gray-500 mb-4">Duration: 00:45</p>

              {/* Call Controls */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <button
                  onClick={toggleMute}
                  className={`p-3 rounded-full border-2 ${
                    isMuted
                      ? "border-gray-400 text-gray-400"
                      : "border-green-600 text-green-600"
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={handleEndCall}
                  className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-10">
        © 2025 CropAI | Smart Agricultural Assistance
      </p>
    </div>
  );
}