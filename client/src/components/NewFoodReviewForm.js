import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";


function NewFoodReviewForm(){
    const [formData, setFormData] = useState({
        rating: 0,
        text: "",
        user_id: null 
    });

    const { foods, addFoodReview, user } = useOutletContext(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (foods.length > 0) {
            setFormData({...formData, food_id: foods[0].id});
        }
        if (user) {
            setFormData({...formData, user_id: user.id}); 
        }
    }, [foods, user]); 

    const optionsElements = foods.map(food => (
        <option key={food.id} value={food.id}>{food.id}: {food.name}</option>
    ));

    function updateFormData(event){
        const value = event.target.name === 'rating' ? parseInt(event.target.value) : event.target.value;
        setFormData({...formData, [event.target.name]: value});
    }

    

    function handleSubmit(event){
        event.preventDefault();
        addFoodReview(formData);
        navigate('/reviews');
    }

    function renderStars(maxRating) {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <span key={i} onClick={() => setFormData({...formData, rating: i})}>
                    {i <= formData.rating ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    }

    

    return (
        <>
            {foods.length > 0 ? 
                <form onSubmit={handleSubmit}>
                    <h2> Add New Food Review</h2>
                    <select onChange={updateFormData} name="food_id">
                        {optionsElements}
                    </select>
                    <div>
                        {renderStars(5)}
                    </div>
                    <input onChange={updateFormData} type="text" name="text" placeholder="Text" value={formData.text}/>
                    <input type="submit" value="Add Food Review"/>
                </form>:
                <h2> Sorry, there are no Foods available to review.</h2>
            }
        </>
    )
}

export default NewFoodReviewForm;
