import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function NewFoodForm() {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        gluten_free: false 
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
        <form onSubmit={handleSubmit}>
            <h2>Add a food</h2>
            <input onChange={updateFormData} type="text" name="name" placeholder="Name" value={formData.name} />
            <input onChange={updateFormData} type="text" name="image" placeholder="Add Image" value={formData.image} />
            <input onChange={updateFormData} type="text" name="description" placeholder="Description" value={formData.description} />
            <input onChange={updateFormData} type="number" name="price" placeholder="Price" value={formData.price} />
            <label>
                <input onChange={updateFormData} type="checkbox" name="gluten_free" checked={formData.gluten_free} />
                Gluten-free
            </label>
            <input type="submit" value="Add Food" />
        </form>
    );
}

export default NewFoodForm;
