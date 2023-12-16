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

        </div>
        <div className="container mx-auto flex flex-wrap justify-center md:justify-between">

          {/* Question Cards */}
          <div className="w-full md:w-1/2 lg:w-1/3 pr-8 mb-8 md:mb-0">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-lg shadow-lg p-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-white">Discover African Culinary Delights</h3>
              <a href="#explore" className="text-blue-300 hover:text-blue-100 transition duration-300 block overflow-hidden">
                <p className="text-gray-200">
                  Embark on a culinary journey with Vittle-Vitles and explore the rich and diverse world of African cuisine. Learn about traditional recipes, modern twists, and the unique flavors that make African dishes so special. Got questions? We're here to help you navigate this exciting culinary adventure!
                </p>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 pr-8 mb-8 md:mb-0">
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

        <a href="/signup" className="bg-yellow-500 text-purple-900 px-12 py-6 rounded-full font-semibold hover:bg-yellow-400 transition duration-300 animate-vibrate">Get Started</a>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Recipe 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Amala_and_Gbegiri_with_Ewedu_soup.jpg/634px-Amala_and_Gbegiri_with_Ewedu_soup.jpg" alt="Featured Recipe 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Yoruba Amala & Ewedu</h3>
                <p className="text-gray-600">Indulge in the rich flavors of this mouthwatering pasta dish. Perfect for a cozy dinner with loved ones.</p>
              </div>
            </div>
            {/* Featured Recipe 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://img-global.cpcdn.com/recipes/c7a26899b9e192b9/640x640sq70/photo.webp" alt="Featured Recipe 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Delta Banga Soup & Starch</h3>
                <p className="text-gray-600">Explore the delightful combination of flavors with these savory and delicious tacos. A perfect treat for any occasion.</p>
              </div>
            </div>
            {/* Featured Recipe 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Featured Recipe 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Fresh Salads</h3>
                <p className="text-gray-600">Enjoy the crispness and freshness of these vibrant salads. A healthy and tasty choice for a light meal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Fascinating African Food Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fact Card 1 */}
            <div className="bg-purple-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Did You Know?</h3>
              <p className="text-gray-300">
                Injera, a sourdough flatbread, is a staple in Ethiopian and Eritrean cuisine. It's not only delicious but also serves as both a plate and utensil!
              </p>
            </div>
            {/* Fact Card 2 */}
            <div className="bg-purple-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Discover Unique Flavors</h3>
              <p className="text-gray-300">
                Berbere, a spice blend from North Africa, adds a rich and spicy flavor to dishes. It typically includes chili peppers, garlic, ginger, basil, and more.
              </p>
            </div>
            {/* Fact Card 3 */}
            <div className="bg-purple-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Culinary Diversity</h3>
              <p className="text-gray-300">
                Africa is home to a diverse range of culinary traditions, from the savory tagines of North Africa to the vibrant jollof rice of West Africa.
              </p>
            </div>
            {/* Add more Fact Cards as needed */}
          </div>
        </div>
      </section>

      {/* Culinary Tips Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Culinary Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tip Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Tip 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Perfecting Flavors</h3>
                <p className="text-gray-600">Learn how to balance and enhance flavors to create memorable and delicious dishes.</p>
              </div>
            </div>
            {/* Tip Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/1843653/pexels-photo-1843653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Tip 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Knife Skills</h3>
                <p className="text-gray-600">Master the art of knife handling and slicing techniques for efficient and safe cooking.</p>
              </div>
            </div>
            {/* Tip Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.pexels.com/photos/2306282/pexels-photo-2306282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Tip 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Presentation Matters</h3>
                <p className="text-gray-600">Discover tips on plating and presentation to make your dishes visually appealing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Team Members</h2>
          <div className="flex justify-center gap-8">
            {/* List of team members with their details */}
            {[
              { id: 1, name: 'Success', role: 'Interface Virtuoso', passion: 'Fullstack dev', image: 'success.jpg' },
              { id: 2, name: 'Mike', role: 'Backend Architect', passion: 'fullstack Dev', image: 'mike.jpg' },
              { id: 3, name: 'Sunkanmi', role: 'Server-side Sage', passion: 'Fullstack Dev', image: 'sunkanmi.JPG' },
              { id: 4, name: 'George', role: 'Algorithm Architect', passion: 'Fullstack dev', image: 'Gorge.JPG' },
              { id: 5, name: 'Felicia', role: 'Data Sorceress', passion: 'Data Scientist', image: 'felicia.jpg' },
              { id: 6, name: 'Sani', role: 'Access Control Guru', passion: 'Fullstack dev', image: 'sani.jpg' },
            ].map(member => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="bg-blue-500 rounded-full shadow-md overflow-hidden w-32 h-32 flex items-center justify-center">
                  <img
                    src={`../teamMembersPictures/${member.image}`}
                    alt={`Team Member ${member.id}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600">Role: {member.role}</p>
                  <p className="text-gray-600">Passionate about: {member.passion}</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Join the Community Section */}
      <section className="bg-purple-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Join the Vittle-Vitles Community</h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8">
            Connect with food enthusiasts, share your culinary journey, and explore a world of flavors together.
          </p>
          <a href="/signup" className="bg-yellow-500 text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition duration-300">Sign Up Now</a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Delicious Recipes!</h3>
                <p className="text-gray-600">Vittle-Vitles has transformed my cooking experience. The recipes are delicious, and the community is so supportive.</p>
                <p className="text-sm text-gray-400 mt-4">- Jane Doe</p>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Fantastic Community</h3>
                <p className="text-gray-600">Being a part of the Vittle-Vitles community has been amazing. I've learned so much and made new friends who share my passion for cooking.</p>
                <p className="text-sm text-gray-400 mt-4">- John Smith</p>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-purple-900">Easy to Follow</h3>
                <p className="text-gray-600">The step-by-step instructions make it easy for even beginners to create delicious meals. I love the variety of recipes available.</p>
                <p className="text-sm text-gray-400 mt-4">- Alice Johnson</p>
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
