'use client'
import { Leaf, Phone, Activity, AlertTriangle, BarChart3, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function DashboardPage() {

    const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const cropStats = [
    { label: "Total Crops Monitored", value: 24 },
    { label: "Diseases Detected", value: 3 },
    { label: "AI Detections Today", value: 5 },
    { label: "Health Score", value: "87%" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between bg-green-700 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Leaf className="w-6 h-6" />
          CropAI Dashboard
        </h1>
        <Button
          variant="secondary"
          className="bg-white text-green-700 hover:bg-green-100"
          onClick={() => handleNavigate("/login")}
        >
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Summary Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {cropStats.map((item) => (
            <div
              key={item.label}
              className="bg-white p-6 rounded-2xl shadow-lg text-center border border-green-100 hover:shadow-xl transition"
            >
              <h2 className="text-3xl font-bold text-green-700">{item.value}</h2>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </section>

        {/* AI Report Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-green-700 flex items-center gap-2">
              <Activity className="w-6 h-6" /> AI Crop Health Report
            </h2>
            <Button
              
              onClick={() => toast.success("Fetching latest AI results...")}
            >
              Refresh Data
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sample Card 1 */}
            <div className="border border-green-100 p-5 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Tomato Leaf - Field 2</h3>
              <p className="text-gray-500 text-sm mb-3">
                AI detected: <strong>Early Blight Disease</strong>
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-yellow-600 font-semibold">
                  <AlertTriangle className="w-5 h-5 mr-1" />
                  Action Required
                </span>
                <Button variant="secondary" onClick={() => alert("Viewing full report...")}>
                  View Report
                </Button>
              </div>
            </div>

            {/* Sample Card 2 */}
            <div className="border border-green-100 p-5 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Wheat Crop - Sector A</h3>
              <p className="text-gray-500 text-sm mb-3">
                AI detected: <strong>No visible disease</strong>
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-green-600 font-semibold">
                  <BarChart3 className="w-5 h-5 mr-1" />
                  Healthy
                </span>
                <Button variant="secondary" onClick={() => alert("Viewing analysis...")}>
                  View Analysis
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Action Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center shadow-lg hover:bg-green-700 transition cursor-pointer"
            onClick={() => handleNavigate("/call")}
          >
            <Phone className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold">Call AI Expert</h3>
            <p className="text-sm text-green-100 mt-1">Instant voice consultation</p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center shadow-lg hover:bg-green-700 transition cursor-pointer"
            onClick={() => handleNavigate("/vc")}
          >
            <Video className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold">Video Consultation</h3>
            <p className="text-sm text-green-100 mt-1">Live crop analysis support</p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center shadow-lg hover:bg-green-700 transition cursor-pointer"
            onClick={() => handleNavigate("/feature")}
          >
            <Activity className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold">AI Features</h3>
            <p className="text-sm text-green-100 mt-1">Explore system capabilities</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-4 text-sm border-t border-green-100">
        © 2025 CropAI | AI Assistance for Crop Detection & Disease Management
      </footer>
    </div>
  );
}