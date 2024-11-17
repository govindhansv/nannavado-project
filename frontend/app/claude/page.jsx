import React from "react";
import { Search, ChevronDown, Globe } from "lucide-react";

const categories = [
  { icon: "💻", name: "Programming & Tech" },
  { icon: "🎨", name: "Graphics & Design" },
  { icon: "📱", name: "Digital Marketing" },
  { icon: "✍️", name: "Writing & Translation" },
  { icon: "🎥", name: "Video & Animation" },
  { icon: "🤖", name: "AI Services" },
  { icon: "🎵", name: "Music & Audio" },
  { icon: "💼", name: "Business" },
  { icon: "📊", name: "Consulting" },
];

const popularServices = [
  {
    title: "Website Development",
    color: "bg-emerald-700",
    image: "/api/placeholder/400/300",
  },
  {
    title: "Logo Design",
    color: "bg-coral-500",
    image: "/api/placeholder/400/300",
  },
  {
    title: "SEO",
    color: "bg-green-900",
    image: "/api/placeholder/400/300",
  },
  {
    title: "Architecture & Interior Design",
    color: "bg-purple-900",
    image: "/api/placeholder/400/300",
  },
  {
    title: "Social Media Marketing",
    color: "bg-olive-700",
    image: "/api/placeholder/400/300",
  },
  {
    title: "Voice Over",
    color: "bg-brown-900",
    image: "/api/placeholder/400/300",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-8">fiverr.</div>
              <div className="relative w-96">
                <input
                  type="text"
                  placeholder="What service are you looking for today?"
                  className="w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-8">
              <button className="text-gray-600 hover:text-gray-900">
                Fiverr Pro <ChevronDown className="inline" size={16} />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                Explore <ChevronDown className="inline" size={16} />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Globe className="inline mr-1" size={16} /> English
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                Become a Seller
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                Sign in
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Join
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-9 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-lg hover:shadow-md cursor-pointer transition-shadow"
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm text-center">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-normal text-gray-700 mb-8">
          Popular services
        </h2>
        <div className="grid grid-cols-6 gap-4">
          {popularServices.map((service, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            >
              <div className={`p-4 ${service.color} text-white`}>
                <h3 className="text-lg font-medium">{service.title}</h3>
              </div>
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fiverr Pro Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-50 rounded-xl p-8">
          <div className="text-2xl font-bold mb-4">fiverr pro.</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
