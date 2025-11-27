'use client'
import React, { useRef, useState } from "react";
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CallingFeaturePage() {
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Start Call
  const handleStartCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      localStreamRef.current = stream;
      setIsCalling(true);

      // 🔗 TODO: Connect to signaling server (WebRTC / Twilio / Agora)
      console.log("Call started");
    } catch (error) {
      console.error("Error accessing camera or microphone:", error);
    }
  };

  // End Call
  const handleEndCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsCalling(false);
  };

  // Mute/Unmute
  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setIsMuted(!isMuted);
  };

  // Toggle Video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setVideoEnabled(!videoEnabled);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex flex-col items-center justify-center text-gray-800 p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-2">📞 AI Crop Assistance Call</h1>
      <p className="text-gray-600 mb-6 text-center max-w-lg">
        Connect live with agricultural experts or AI assistant for real-time crop disease diagnosis.
      </p>

      {/* Call Interface */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6">
        {!isCalling ? (
          <div className="flex flex-col items-center justify-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <User className="w-12 h-12 text-green-700" />
            </div>
            <h2 className="text-xl font-semibold mb-2">CropAI Expert</h2>
            <p className="text-gray-500 mb-6">Available for Video Consultation</p>
            <Button
              
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleStartCall}
            >
              <Phone className="w-5 h-5" /> Start Video Call
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Video Preview Section */}
            <div className="relative flex justify-center">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-64 object-cover rounded-xl border border-green-300 shadow-md"
              />
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="hidden"
              />
            </div>

            {/* Call Controls */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full border-2 ${
                  isMuted
                    ? "border-gray-400 text-gray-400"
                    : "border-green-600 text-green-600"
                }`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full border-2 ${
                  videoEnabled
                    ? "border-green-600 text-green-600"
                    : "border-gray-400 text-gray-400"
                }`}
              >
                {videoEnabled ? (
                  <Video className="w-6 h-6" />
                ) : (
                  <VideoOff className="w-6 h-6" />
                )}
              </button>

              <button
                onClick={handleEndCall}
                className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-8">
        © 2025 CropAI | Smart Agricultural Assistance
      </p>
    </div>
  );
}