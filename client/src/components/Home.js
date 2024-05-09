import React from "react";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 relative">
            
            <img src="/assets/Background4.png" alt="Background Waves" className="absolute inset-0 w-full h-1/2 object-cover z-0" />

        

        
            <div className="relative z-10">
                <section>
                    <img src="/assets/Suhsi4.png" alt="Sakanamono Home" className="h-90 w-90 rounded-lg" />
                </section>
                
                
                <section className="mt-8 max-w-4xl mx-auto bg-blue-100 p-6 rounded-lg shadow h-auto md:h-50 w-full md:w-3/4 text-center bg-custom">
                    <h2 className="text-4xl font-semibold mb-2 text-white text-border">Hours of Operation</h2>
                    <p className="text-2xl font-semibold text-white text-border">Tuesday - Saturday : 4:00pm to 10:00pm</p>
                    <p className="text-2xl font-semibold mb-1 text-white text-border">Happy Hour</p>
                    <p className="text-2xl font-semibold text-white text-border">4:00pm to 6:00pm</p>
                </section>






                
                
                <section className="mt-7 max-w-4xl grid grid-cols-2 gap-2">
                    <div className="bg-gray-300 h-70 rounded-lg">
                        <img src="assets/Dishes2.png" alt="Sunset" className="rounded-image" />
                     </div>
                    <div className="bg-gray-300 h-32 w-90 rounded-lg">
                         <img src="assets/Dishes.png" alt="Image 2" className="rounded-image" />
                    </div>
                    <div className="bg-gray-300 h-32 w-0 rounded-lg">
                        <img src="assets/Dishes2.png" alt="Image 3" className="rounded-image" />
                    </div>
                    <div className="bg-blue-50 h-60 w-60 rounded-lg">
                        <img src="assets/Cheers.png" alt="Image 4" className="rounded-image" />
                    </div>
                </section>


                
                <section className="mt-8  max-w-4xl bg-custom p-6 rounded-lg shadow h-auto md:h-50 w-full md:w-3/4 mx-auto">
                <h2 className="text-2xl text-white text-border font-semibold mb-2">About Us</h2>
                <p className="  text-white text-border font-semibold">Welcome to Sakanamono.
                Our chefs are like culinary ninjas, wielding their knives with the precision of a master sushi sensei and the creativity of a manga artist. Each dish they craft is a work of edible art, a fusion of tradition and innovation.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Home;
