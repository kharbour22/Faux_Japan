import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function NewDrinkForm() {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        drink_type: ""
    });

    const { addDrink } = useOutletContext();
    const navigate = useNavigate();

    function updateFormData(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        addDrink(formData);
        navigate('/drinks');
    }

    return (
        <div className="flex flex-col items-center justify-center mt-4">
        <div className="w-full max-w-xs" style={{ backgroundImage: `url(/assets/Scales.png)`, backgroundSize: 'cover', padding: '8px', borderRadius: '5px' }}> 
            <h2 className="text-xl  text-white font-semibold text-border mb-4">Add a Drink</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    onChange={updateFormData}
                    type="text"
                    name="name"
                    placeholder="Drink Name"
                    value={formData.name}
                    className="block w-full border border-gray-400 rounded-md py-2 px-4"
                />
                
                <input
                    onChange={updateFormData}
                    type="text"
                    name="image"
                    placeholder="Add Image"
                    value={formData.image}
                    className="block w-full border border-gray-400 rounded-md py-2 px-4"
                />
                <input
                    onChange={updateFormData}
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    className="block w-full border border-gray-400 rounded-md py-2 px-4"
                />
                <input
                    onChange={updateFormData}
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    className="block w-full border border-gray-400 rounded-md py-2 px-4"
                />
                <div className="flex items-center">
                    <label className="mr-2 text-white">Drink Type:</label>
                    <select
                        onChange={updateFormData}
                        name="drink_type"
                        value={formData.drink_type}
                        className="border border-gray-400 rounded-md py-2 px-4"
                    >
                        <option value="">Select Drink Type</option>
                        <option value="Cocktail">Cocktail</option>
                        <option value="Sake">Sake</option>
                        <option value = "Beer">Beer</option>
                        

                    </select>
                </div>
                <input
                    type="submit"
                    value="Add Drink"
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-blue-600"
                />
            </form>
        </div>
        </div>
    );
}

export default NewDrinkForm;
