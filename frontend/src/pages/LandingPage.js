import React, { useEffect } from 'react';
import Typed from 'typed.js';

function LandingPage() {
  useEffect(() => {
    // Initialize Typed.js
    const options = {
      strings: ["Explore the richness of African cuisine with Vittle-Vitles.", "Have questions? We've got answers!"],
      typeSpeed: 50, // Adjust the typing speed as needed
      backSpeed: 30, // Adjust the backspacing speed as needed
      loop: true, // Set to true if you want the typing to loop
    };
    const typed = new Typed('.typed-text', options);

    // Cleanup when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <header className="bg-purple-900 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold">Vittle-Vitles</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-cover bg-center text-white py-20" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.pexels.com/photos/19297921/pexels-photo-19297921/free-photo-of-wet-fallen-leaves-lying-on-grass.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">Discover the Richness of African Cuisine</h2>
          <p className="text-md md:text-lg lg:text-xl mb-8">
            <span className="typed-text"></span>
          </p>
          <a href="/signup" className="bg-yellow-500 text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition duration-300">Get Started</a>
        </div>
        <div className="container mx-auto flex flex-wrap justify-center md:justify-between">
          {/* Question Cards */}
          <div className="w-full md:w-1/2 lg:w-1/3 pr-8 mb-8 md:mb-0 animate-vibrate">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-lg shadow-lg p-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-white">Discover African Culinary Delights</h3>
              <a href="#explore" className="text-blue-300 hover:text-blue-100 transition duration-300 block overflow-hidden">
                <p className="text-gray-200">
                  Embark on a culinary journey with Vittle-Vitles and explore the rich and diverse world of African cuisine. Learn about traditional recipes, modern twists, and the unique flavors that make African dishes so special. Got questions? We're here to help you navigate this exciting culinary adventure!
                </p>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 pr-8 mb-8 md:mb-0 animate-vibrate">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-lg shadow-lg p-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-white">How Vittle-Vitles Works</h3>
              <a href="#explore" className="text-blue-300 hover:text-blue-100 transition duration-300 block overflow-hidden">
                <p className="text-gray-200">
                  Curious about how Vittle-Vitles can elevate your culinary experience? Let us guide you through the key features and functionalities. Discover personalized recipe recommendations, cooking tips, and a vibrant community passionate about African cuisine. Ready to get started? Click below and begin your journey to becoming a Vittle-Vitles culinary expert!
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Featured Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dish Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Dish 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Jollof Rice</h3>
                <p className="text-gray-600">A flavorful and aromatic one-pot rice dish, seasoned to perfection with a blend of spices, tomatoes, and peppers.</p>
              </div>
            </div>
            {/* Dish Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Dish 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Jollof Rice</h3>
                <p className="text-gray-600">A flavorful and aromatic one-pot rice dish, seasoned to perfection with a blend of spices, tomatoes, and peppers.</p>
              </div>
            </div>
            {/* Dish Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Dish 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Banga Soup</h3>
                <p className="text-gray-600">A flavorful and aromatic one-pot rice dish, seasoned to perfection with a blend of spices, tomatoes, and peppers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Vittle-Vitles. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
