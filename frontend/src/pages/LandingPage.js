import React from 'react';

function LandingPage() {
  return (
    <div>
      {/* Navigation Bar */}
      <header className="bg-purple-700 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold">Vittle-Vitles</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-cover bg-center text-white py-20" style={{ backgroundImage: 'url("path/to/your/hero-image.jpg")' }}>
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">Discover the Richness of African Cuisine</h2>
          <p className="text-lg mb-8">Embark on a culinary journey to explore the diverse and flavorful dishes that Africa has to offer. From traditional recipes to modern delights, Vittle-Vitles is your gateway to authentic African cuisine.</p>
          <a href="#explore" className="bg-yellow-500 text-purple-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition duration-300">Explore Now</a>
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Featured Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dish Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Dish 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Jollof Rice</h3>
                <p className="text-gray-600">A flavorful and aromatic one-pot rice dish, seasoned to perfection with a blend of spices, tomatoes, and peppers.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Dish 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Jollof Rice</h3>
                <p className="text-gray-600">A flavorful and aromatic one-pot rice dish, seasoned to perfection with a blend of spices, tomatoes, and peppers.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Dish 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Banga Soup</h3>
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
