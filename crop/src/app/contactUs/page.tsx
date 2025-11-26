'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 text-gray-800">
      {/* Header */}
      <header className="bg-green-700 text-white py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold">📞 Contact Us</h1>
        <p className="mt-2 text-lg">We’d love to hear from you</p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-6">Get in Touch</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit"  className="w-full md">
              Send Message
            </Button>
          </form>
        </section>

        {/* Contact Info + Map */}
        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-6">Reach Us</h2>
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <p>
              <strong>📍 Address:</strong><br />
              FC-26 shastri Park, New Delhi-110053
            </p>
            <p>
              <strong>📞 Phone:</strong><br />
              +91 9312445693
            </p>
            <p>
              <strong>✉ Email:</strong><br />
              rajeevkumar25112002@gmail.com
            </p>
          </div>

          {/* Google Map Embed */}
          <div className="mt-6 rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14016.953741126958!2d77.206!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2bdf233b9b9%3A0x9a5a93612e5826df!2sNew%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1634824000000!5m2!1sen!2sin"
              width="100%"
              height="250"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-4 text-center">
        <p>© 2025 CropAI | All Rights Reserved</p>
      </footer>
    </div>
  );
}