import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function NewFoodForm() {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        gluten_free: false,
        food_type: "" 
    });
    const { addFood } = useOutletContext();
    const navigate = useNavigate();

    function updateFormData(event) {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setFormData({ ...formData, [event.target.name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        addFood(formData);
        navigate('/foods');
    }

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            <div className="w-full max-w-xs" style={{ backgroundImage: `url(/assets/Scales2.png)`, backgroundSize: 'cover', padding: '8px', borderRadius: '5px' }}> 
            <h2 className="text-xl  text-white font-semibold text-border mb-4">Add a Food</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    onChange={updateFormData}
                    type="text"
                    name="name"
                    placeholder="Name"
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
                    <label className="mr-2 text-white">Food Type:</label>
                    <select
                        onChange={updateFormData}
                        name="food_type"
                        value={formData.food_type}
                        className="border border-gray-400 rounded-md py-2 px-4"
                    >
                        <option value="">Select Food Type</option>
                        <option value="Cool">Cool</option>
                        <option value="Hot">Hot</option>
                        <option value = "Daily Specials">Daily Specials</option>
                        <option value= "Dessert">Dessert</option>

                    </select>
                </div>
                <div className="flex items-center">
                    <input
                        onChange={updateFormData}
                        type="checkbox"
                        name="gluten_free"
                        checked={formData.gluten_free}
                        className="mr-2"
                    />
                    <label className="text-sm text-white">Gluten-free</label>
                </div>
                <input
                    type="submit"
                    value="Add Food"
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-blue-600"
                />
            </form>
        </div>
        </div>
    );
}

export default NewFoodForm;
