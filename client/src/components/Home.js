import React from "react";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 relative">
            {/* Background Image */}
            <img src="/assets/Waves.png" alt="Background Waves" className="absolute inset-0 w-full h-90 object-cover z-0" />

            {/* Content */}
            <div className="relative z-10">
                <section>
                    <img src="/assets/Logo2.png" alt="Sakanamono Home" className="h-90 w-90 rounded-lg" />
                </section>
                
                
                {/* Hours of Operation */}
                <section className="mt-8 max-w-4xl mx-auto bg-blue-100 p-6 rounded-lg shadow h-auto md:h-50 w-full md:w-3/4 text-center">
                    <h2 class="text-2xl font-semibold mb-2">Hours of Operation</h2>
                    <p>Tuesday - Saturday : 4:00pm to 10:00pm</p>
                    <p class="text-1xl font-semibold mb-1">Happy Hour</p>
                    <p>4:00pm to 6:00pm</p>
                </section>


                
                {/* Image Containers */}
                <section className="mt-7 max-w-4xl grid grid-cols-2 gap-2 ">
                    <div className="bg-gray-300 h-70 rounded-lg">
                    <img src="assets/Dishes2.png" alt="Sunset" />
                     </div>
                    <div className="bg-gray-300 h-32 w-90 rounded-lg">
                    <img src="assets/Dishes.png" alt="Image 2" />
                    </div>
                    <div className="bg-gray-300 h-32 w-0 rounded-lg">
                    <img src="assets/Dishes2.png" alt="Image 3" />
                    </div>
                    <div className="bg-blue-50 h-64 w-80 rounded-lg">
                    <img src="assets/Nabe.png" alt="Image 4" />
                    </div>
                   </section>

                {/* About Us Section */}
                <section class="mt-8 max-w-4xl bg-blue-100 p-6 rounded-lg shadow h-auto md:h-50 w-full md:w-3/4 mx-auto">
                <h2 class="text-2xl font-semibold mb-2">About Us</h2>
                <p>Welcome to Sakanamono, where the fish are fresher than your Monday memes and the vibes are as zen as a cat in a sunbeam.
                Our chefs are like culinary ninjas, wielding their knives with the precision of a master sushi sensei and the creativity of a manga artist. Each dish they craft is a work of edible art, a fusion of tradition and innovation that’ll make your taste buds do a happy dance.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Home;
