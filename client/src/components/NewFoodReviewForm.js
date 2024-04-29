import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function NewFoodReviewForm(){
    const [formData, setFormData] = useState({
        rating: 0,
        text: ""
    })

    const {foods, addFoodReview} = useOutletContext()
    const navigate = useNavigate()

    useEffect(()=> {
        if(foods.length > 0){
            setFormData({...formData, food_id: foods[0].id})
        }
    },[foods])

    const optionsElements = foods.map(food => {
        return <option key={food.id} value = {food.id} > {food.id}: {food.name}</option>
    })

    function updateFormData(event){
        if(event.target.name === 'rating' || event.target.name === "food_id"){
            setFormData({...formData, [event.target.name] : Number (event.target.value)})
        }
        else{
            setFormData({...formData, [event.target.name]: event.target.value})
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        addFoodReview(formData)
        navigate('/reviews')
    }

    return (
        <>
            {foods.length > 0 ? 
                <form onSubmit={handleSubmit}>
                <h2> Add New Food Review</h2>
                <select onChange={updateFormData} name = "food_id">
                    {optionsElements}
                </select>
                <input onChange={updateFormData} type = "number" name="rating" placeholder="Rating" value={formData.rating}/>
                <input onChange={updateFormData} type = "text" name="text" placeholder="Text" value={formData.text}/>
                <input type = "submit" value="Add Food Review"/>
                </form>:
                <h2> Sorry, there are no Foods available to review.</h2>
            }
        </>
    )

}
export default NewFoodReviewForm