import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

function FoodProfile() {
    const [food, setFood] = useState(null);
    const [displayForm, setDisplayForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        gluten_free: false,
        food_type: ""
    });

    const { id } = useParams();
    const { deleteFood, updateFood } = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/foods/${id}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(foodData => {
                        setFood(foodData);
                        setFormData({
                            name: foodData.name,
                            image: foodData.image,
                            description: foodData.description,
                            price: foodData.price,
                            gluten_free: foodData.gluten_free === 'Yes'
                        });
                    });
                } else {
                    response.json().then(data => alert(`Error: ${data.error || "Something went wrong."}`));
                }
            });
    }, [id]);

    function handleDeleteButtonClick() {
        deleteFood(food.id);
        navigate('/foods'); 
    }

    function toggleDisplayForm() {
        setDisplayForm(prevDisplayForm => !prevDisplayForm);
    }

    function handleSubmit(event) {
        event.preventDefault();
        updateFood(food.id, formData, updatedFood => {
            setFood(updatedFood);
            toggleDisplayForm();
        });
    }

    function updateFormData(event) {
        const { name, value, type, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    }

    function displayButtonsOrEditForm() {
        if (!displayForm) {
            return (
                <div className="flex justify-between mt-4">
                    <button onClick={toggleDisplayForm} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">
                        Update Food
                    </button>
                    <button onClick={handleDeleteButtonClick} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none">
                        Delete Food
                    </button>
                </div>
            );
        } else {
            return (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        onChange={updateFormData}
                        type="text"
                        name="name"
                        placeholder="Food Name"
                        value={formData.name}
                        className="block w-full border border-gray-400 rounded-md py-2 px-4"
                    />
                    <div className="flex items-center">
                    <label className="mr-2">Food Type:</label>
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
                    <input
                        onChange={updateFormData}
                        type="text"
                        name="image"
                        placeholder="Image"
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
                    <label className="flex items-center space-x-2">
                        <input
                            onChange={updateFormData}
                            type="checkbox"
                            name="gluten_free"
                            checked={formData.gluten_free}
                        />
                        <span>Gluten Free</span>
                    </label>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                        Save Changes
                    </button>
                </form>
            );
        }
    }

    return (
        <div className="max-w-md mx-auto lg:ml-0">
            {food && (
                <div className="food-profile space-y-4 p-4 border border-gray-600 rounded-lg">
                    <img src={food.image} alt={food.name} className="w-full h-auto rounded-md"/>
                    <h4 className="text-xl font-bold">{food.name}</h4>
                    <p>{food.description}</p>
                    <p className="font-semibold">${food.price}</p>
                    <p>{food.gluten_free ? "Gluten Free" : "Contains Gluten"}</p>
                    {displayButtonsOrEditForm()}
                </div>
            )}
        </div>
    );
}

export default FoodProfile;
