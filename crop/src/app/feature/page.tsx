'use client'
import { Button } from "@/components/ui/button";



const features = [
  {
    title: "🌱 AI Crop Disease Detection",
    description:
      "Upload a photo of your crop and our AI will instantly detect common diseases and suggest treatments.",
    icon: "🤖",
  },
  {
    title: "🛰 Real-time Crop Monitoring",
    description:
      "Monitor crop health using AI analytics and get notified about changes before they become serious.",
    icon: "📡",
  },
  {
    title: "📊 Data-Driven Insights",
    description:
      "Track growth patterns, yield predictions, and soil conditions through interactive dashboards.",
    icon: "📈",
  },
  {
    title: "🌦 Weather-based Alerts",
    description:
      "Receive accurate, location-based weather forecasts and smart irrigation reminders.",
    icon: "☀",
  },
  {
    title: "🌿 Multilingual Support",
    description:
      "Farmers can access the platform in their preferred language to ensure better understanding.",
    icon: "🗣",
  },
  {
    title: "🔐 Secure & Easy to Use",
    description:
      "Simple interface for all users with data security and privacy built-in.",
    icon: "🔒",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 text-gray-800">
      {/* Header */}
      <header className="bg-green-700 text-white py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold">🚀 Key Features</h1>
        <p className="mt-2 text-lg">
          Empowering farmers with smart AI tools for better crop management
        </p>
      </header>

      {/* Features Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Start using AI for smarter farming
          </h2>
          <Button
            
            size="lg"
            onClick={() => alert("Redirect to Register / Try Demo")}
          >
            Try Demo Now
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-4 text-center">
        <p>© 2025 CropAI | All Rights Reserved</p>
      </footer>
    </div>
  );
}