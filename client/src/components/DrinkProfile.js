import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

function DrinkProfile(){
    const [drink, setDrink] = useState(null)
    const [displayForm, setDisplayForm] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        image:"",
        description:"",
        price: "",
        
    })

    const {id} = useParams()
    const {deleteDrink, updateDrink} = useOutletContext()
    const navigate = useNavigate()

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
                } else if (response.status === 404) {
                    response.json().then(errorData => alert(`Error: ${errorData.error}`));
                } else {
                    response.json().then(() => alert("Error: Something went wrong."));
                }
            });
    }, [id]);

    function handleDeleteButtonClick(){
        deleteDrink(drink.id)
    }

    function toggleDisplayForm(){
        setDisplayForm(prevDisplayForm => !prevDisplayForm)
    }

    function handleSubmit(event){
        event.preventDefault()
        updateDrink(drink.id, formData, updateDrink => {
            setDrink(updateDrink)
            toggleDisplayForm()
        })
    }

    function updateFormData(event){
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    function displayButtonsOrEditForm(){
        if (!displayForm){
            return(
                <div className="button-div">
                    <button onClick={toggleDisplayForm} className="update-button border border-green-600 rounded-md p-2 mr-2">Update Drink</button>
                    <button onClick={handleDeleteButtonClick} className="delete-button border border-red-600 rounded-md p-2">Delete Drink</button>
                </div>
            )
        } else{
            return(
                <form onSubmit={handleSubmit} className="edit-drink">
                    <div className="border border-gray-300 rounded-md p-2 mb-2">
                        <input onChange={updateFormData} type = "text" name = "name" placeholder="Drink Name" value={formData.name}/>
                    </div>
                    <div className="border border-gray-300 rounded-md p-2 mb-2">
                        <input onChange={updateFormData} type = "text" name = "image" placeholder="Image" value={formData.image}/>
                    </div>
                    <div className="border border-gray-300 rounded-md p-2 mb-2">
                        <input onChange={updateFormData} type = "text" name = "description" placeholder="Description" value={formData.description}/>
                    </div>
                    <div className="border border-gray-300 rounded-md p-2 mb-2">
                        <input onChange={updateFormData} type = "number" name = "price" placeholder="Price" value={formData.price}/>
                    </div>
                    <button type="submit" className="border border-blue-600 rounded-md p-2 mt-2">Save Changes</button>
                </form>
            )
        }
    }

    return(
        <>
            {drink &&
                <div className="drink-profile">
                    <img src={drink.image} alt={drink.name}/>
                    <h4>{drink.name}</h4>
                    <h4>{drink.description}</h4>
                    <h4>{drink.price}</h4>
                    
                    {displayButtonsOrEditForm()}
                </div>
            }
        </>
    )
}
export default DrinkProfile
