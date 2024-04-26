import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";


function FoodProfile(){
    const [food, setFood] = useState(null)
    const [displayForm, setDisplayForm] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        image:"",
        description:"",
        price: "",
        gluten_free:""
    })

    const {id} = useParams()
    const {deleteFood, updateFood} = useOutletContext()
    const navigate = useNavigate()

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

    function handleDeleteButtonClick(){
        deleteFood(food.id)
    }

    function toggleDisplayForm(){
        setDisplayForm(prevDisplayForm => !prevDisplayForm)
    }

    function handleSubmit(event){
        event.preventDefault()
        updateFood(food.id, formData, updateFood => {
            setFood(updateFood)
            toggleDisplayForm()
        })
    }

    function updateFormData(event) {
        const { name, value, type, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    }

    function displayButtonsOrEditForm(){
        if (!displayForm){
            return(
                <div className="button-div">
                    <button onClick={toggleDisplayForm} className="update-button">Update Food</button>
                    <button onClick={handleDeleteButtonClick} className="delete-button">Delete Food</button>
                </div>
            )
        } else{
            return(
                <form onSubmit={handleSubmit} className="edit-food">
    <input onChange={updateFormData} type="text" name="name" placeholder="Food Name" value={formData.name} />
    <input onChange={updateFormData} type="text" name="image" placeholder="Image" value={formData.image} />
    <input onChange={updateFormData} type="text" name="description" placeholder="Description" value={formData.description} />
    <input onChange={updateFormData} type="number" name="price" placeholder="Price" value={formData.price} />
    <label>
        Gluten Free:
        <input onChange={updateFormData} type="checkbox" name="gluten_free" checked={formData.gluten_free} />
    </label>
    <button type="submit">Save Changes</button>
</form>

            )
        }
    }


    return(
        <>
            {food &&
                <div className="food-profile">
                    <img src={food.image} alt={food.name}/>
                    <h4>{food.name}</h4>
                    <h4>{food.description}</h4>
                    <h4>{food.price}</h4>
                    <h4>{food.gluten_free}</h4>
                    {displayButtonsOrEditForm()}
                </div>
            }
        </>
    )
}
export default FoodProfile