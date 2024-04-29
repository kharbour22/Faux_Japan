import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function NewDrinkForm() {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price:""
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
        <form onSubmit={handleSubmit}>
            <h2>Add a drink</h2>
            <input onChange={updateFormData} type="text" name="name" placeholder="Drink Name" value={formData.name} />
            <input onChange={updateFormData} type="text" name="image" placeholder="Add Image" value={formData.image} />
            <input onChange={updateFormData} type="text" name="description" placeholder="Description" value={formData.description} />
            <input onChange={updateFormData} type="number" name="price" placeholder="Price" value={formData.price} />
            <input type="submit" value="Add Drink" />
        </form>
    );
}

export default NewDrinkForm;
