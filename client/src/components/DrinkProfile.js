import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

function DrinkProfile() {
    const [drink, setDrink] = useState(null);
    const [displayForm, setDisplayForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        drink_type: ""
    });

    const { id } = useParams();
    const { deleteDrink, updateDrink } = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/drinks/${id}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(drinkData => {
                        setDrink(drinkData);
                        setFormData({
                            name: drinkData.name,
                            image: drinkData.image,
                            description: drinkData.description,
                            price: drinkData.price,
                            
                        });
                    });
                } else {
                    response.json().then(data => alert(`Error: ${data.error || "Something went wrong."}`));
                }
            });
    }, [id]);

    function handleDeleteButtonClick() {
        deleteDrink(drink.id);
        navigate('/drinks'); 
    }

    function toggleDisplayForm() {
        setDisplayForm(prevDisplayForm => !prevDisplayForm);
    }

    function handleSubmit(event) {
        event.preventDefault();
        updateDrink(drink.id, formData, updatedDrink => {
            setDrink(updatedDrink);
            toggleDisplayForm();
        });
    }

    function updateFormData(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function displayButtonsOrEditForm() {
        if (!displayForm) {
            return (
                <div className="flex justify-between mt-4">
                    <button onClick={toggleDisplayForm} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">
                        Update Drink
                    </button>
                    <button onClick={handleDeleteButtonClick} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none">
                        Delete Drink
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
                    placeholder="Drink Name"
                    value={formData.name}
                    className="block w-full border border-gray-400 rounded-md py-2 px-4"
                />
                <div className="flex items-center">
                    <label className="mr-2">Drink Type:</label>
                    <select
                        onChange={updateFormData}
                        name="drink_type"
                        value={formData.drink_type}
                        className="border border-gray-400 rounded-md py-2 px-4"
                    >
                        <option value="">Select Drink Type</option>
                        <option value="Cocktail">Cocktail</option>
                        <option value="Sake">Sake</option>
                        <option value="Beer">Beer</option>
                    </select>
                </div>
                <input
                    onChange={updateFormData}
                    type="text"
                    name="image"
                    placeholder="Image URL"
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
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                    Save Changes
                </button>
            </form>
            
            );
        }
    }

    return (
        <div className="max-w-md mx-auto lg:ml-0">
            {drink && (
                <div className="drink-profile space-y-4 p-4 border border-gray-600 rounded-lg">
                    <img src={drink.image} alt={drink.name} className="w-full h-auto rounded-md"/>
                    <h4 className="text-xl font-bold">{drink.name}</h4>
                    <p>{drink.description}</p>
                    <p className="font-semibold">${drink.price}</p>
                    {displayButtonsOrEditForm()}
                </div>
            )}
        </div>
    );
}

export default DrinkProfile;
