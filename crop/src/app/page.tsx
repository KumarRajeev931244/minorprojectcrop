
import { Leaf, Sprout, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
          <Leaf className="w-6 h-6" />
          CropAI
        </div>
        <nav className="flex gap-6 text-gray-700 font-medium">
           <Link href='/feature' className="hover:text-green-700">Feature</Link>
          <Link href='/aboutUs' className="hover:text-green-700">About</Link>
          <Link href='/contactUs' className="hover:text-green-700">Contact us</Link>
          <Link href='/agriculturevideo' className="hover:text-green-700">Video</Link>
          <Link href='/signin'>
            <Button className="w-full md:w-auto cursor-pointer">Login</Button>
          </Link>
          {/* <a href="#login" className="hover:text-green-700">Login</a> */}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800 leading-tight">
          AI Assistance for <span className="text-green-600">Crop Detection</span> <br />
          & Disease Management
        </h1>
        <p className="mt-6 text-lg text-gray-700 max-w-2xl">
          Empowering farmers with Artificial Intelligence to detect crop health issues early, 
          improve yield, and ensure sustainable agriculture.
        </p>
       
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-green-50 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <Sprout className="w-12 h-12 text-green-700 mb-4" />
            <h3 className="text-xl font-semibold text-green-800">Crop Health Detection</h3>
            <p className="text-gray-600 mt-2 text-center">
              Upload leaf images and get instant disease detection using AI-powered models.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <Brain className="w-12 h-12 text-green-700 mb-4" />
            <h3 className="text-xl font-semibold text-green-800">Smart Recommendations</h3>
            <p className="text-gray-600 mt-2 text-center">
              Get AI-driven suggestions for fertilizers, pesticides, and organic solutions.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <Leaf className="w-12 h-12 text-green-700 mb-4" />
            <h3 className="text-xl font-semibold text-green-800">Farmer-Friendly</h3>
            <p className="text-gray-600 mt-2 text-center">
              Multilingual support and easy-to-use design made for rural farmers.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-green-700 text-white text-center py-6">
        <p>&copy; 2025 CropAI | Designed for Smart Agriculture 🌱</p>
      </footer>
    </div>
  );
}

