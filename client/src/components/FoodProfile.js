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
        gluten_free: ""
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
                            gluten_free: foodData.gluten_free
                        });
                    });
                } else if (response.status === 404) {
                    response.json().then(errorData => alert(`Error: ${errorData.error}`));
                } else {
                    response.json().then(() => alert("Error: Something went wrong."));
                }
            });
    }, [id]);

    function handleDeleteButtonClick() {
        deleteFood(food.id);
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
                <div className="button-div">
                    <button onClick={toggleDisplayForm} className="update-button border border-green-600 rounded-md p-2 mr-2">Update Food</button>
                    <button onClick={handleDeleteButtonClick} className="delete-button border border-red-600 rounded-md p-2">Delete Food</button>
                </div>
            );
        } else {
            return (
                <form onSubmit={handleSubmit} className="edit-food">
                    <div className="border border-gray-300 rounded-md p-2 mb-2">
                        <input onChange={updateFormData} type="text" name="name" placeholder="Food Name" value={formData.name} />
                    </div>
                    <div className="border border-gray-300 rounded-md p-2 mb-2">
                        <input onChange={updateFormData} type="text" name="image" placeholder="Image" value={formData.image} />
                    </div>
                    <div className="border border-gray-300 rounded-md p-2 mb-2">
                        <input onChange={updateFormData} type="text" name="description" placeholder="Description" value={formData.description} />
                    </div>
                    <div className="border border-gray-300 rounded-md p-2 mb-2">
                        <input onChange={updateFormData} type="number" name="price" placeholder="Price" value={formData.price} />
                    </div>
                    <div className="border border-gray-300 rounded-md p-2 mb-2">
                        <label>
                            Gluten Free:
                            <input onChange={updateFormData} type="checkbox" name="gluten_free" checked={formData.gluten_free} />
                        </label>
                    </div>
                    <button type="submit" className="border border-blue-600 rounded-md p-2 mt-2">Save Changes</button>
                </form>
            );
        }
    }
    

    return (
        <div className="max-w-md mx-auto lg:ml-0">
            {food && (
                <div className="food-profile">
                    <img src={food.image} alt={food.name}/>
                    <h4>{food.name}</h4>
                    <h4>{food.description}</h4>
                    <h4>{food.price}</h4>
                    <h4>{food.gluten_free}</h4>
                    {displayButtonsOrEditForm()}
                </div>
            )}
        </div>
    );
}

export default FoodProfile;
