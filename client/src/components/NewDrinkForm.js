import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function NewDrinkForm() {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price: ""
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
        <div className="border border-gray-600 p-4 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl mb-4">Add a Drink</h2>
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
                <input
                    type="submit"
                    value="Add Drink"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                />
            </form>
        </div>
    );
}

export default NewDrinkForm;
