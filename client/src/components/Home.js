import React from "react";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <section>
            <img src="/assets/logo.webp" alt="Sakanamono Home" className="h-90 w-90 rounded-lg" />
            </section>
            
            {/* Hours of Operation */}
            <section className="mt-8 max-w-4xl">
                <h2 className="text-2xl font-semibold mb-2">Hours of Operation</h2>
                <p>Tues - Friday: 4:00pm - 10:00 PM</p>
                <p>Sunday - Monday: Closed</p>
            </section>
            
            {/* Image Containers */}
            <section className="mt-8 max-w-4xl grid grid-cols-2 gap-4">
                <div className="bg-gray-300 h-64">Image 1</div>
                <div className="bg-gray-300 h-32">Image 2</div>
                <div className="bg-gray-300 h-32">Image 3</div>
                <div className="bg-gray-300 h-64">Image 4</div>
            </section>

            {/* About Us Section */}
            <section className="mt-8 max-w-4xl">
                <h2 className="text-2xl font-semibold mb-2">About Us</h2>
                <p>Welcome to Sakanamono, where the fish are fresher than your Monday memes and the vibes are as zen as a cat in a sunbeam.</p>
            </section>

        </div>
    );
}

export default Home;
