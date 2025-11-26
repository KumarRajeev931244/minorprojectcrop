'use client';
import { Button } from "@/components/ui/button";
import React from "react";


export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800">
      {/* Header */}
      <header className="bg-green-700 text-white py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold">🌾 About Us</h1>
        <p className="mt-2 text-lg">Empowering farmers with Artificial Intelligence</p>
      </header>

      {/* Main Section */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Project Purpose */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Our project, <span className="font-semibold">AI Crop Detection & Disease Management</span>, 
            is designed to help farmers identify crop diseases early using Artificial Intelligence. 
            By uploading an image of a crop, our model detects diseases and provides 
            recommendations to improve yield, reduce loss, and ensure sustainable farming.
          </p>
        </section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80"
              alt="Smart Farming"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to bring advanced AI technology to rural areas, empowering 
              farmers with accessible and affordable digital tools. Our vision is to 
              make precision agriculture available to everyone — regardless of location, 
              language, or technical expertise.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-6">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Rajeev Kumar", role: "Team Lead & Developer" },
              { name: "Prince singh", role: "Team Lead & Developer" },
              { name: "Rishav prasad yadav", role: "Team Lead & Developer" },
              { name: "Deeharaj rathore", role: "Team Lead & Developer" },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <img
                //   src={https://api.dicebear.com/9.x/initials/svg?seed=${member.name}}
                  alt={member.name}
                  className="w-20 h-20 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-green-700">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Want to learn more about our project?
          </h2>
          <Button size="lg" onClick={() => alert("Redirect to Contact Page")}>
            Contact Us
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-4 text-center">
        <p>© 2025 CropAI | All Rights Reserved</p>
      </footer>
    </div>
  );
}
