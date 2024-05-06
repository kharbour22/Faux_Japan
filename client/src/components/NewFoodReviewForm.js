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
                <span key={i} onClick={() => setFormData({...formData, rating: i})}
                      className={`cursor-pointer ${i <= formData.rating ? 'text-yellow-500' : 'text-gray-400'}`}>
                    ★
                </span>
            );
        }
        return stars;
    }

    return (
        <div className="border border-gray-600 p-4 rounded-lg max-w-md mx-auto">
            {foods.length > 0 ? 
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl mb-4">Add a New Review</h2>
                    <select onChange={updateFormData} name="food_id" className="block w-full border border-gray-400 rounded-md py-2 px-4 mb-4">
                        {optionsElements}
                    </select>
                    
                    <input onChange={updateFormData} type="text" name="text" placeholder="Review(Optional)" value={formData.text} className="block w-full border border-gray-400 rounded-md py-2 px-4 mb-4"/>
                    <div className=" mb-4">
                       Required:{renderStars(5)}
                    </div>
                    <input type="submit" value="Add Food Review" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 cursor-pointer"/>
                </form> :
                <h2 className="text-xl mb-4">Sorry, there are no Foods available to review.</h2>
            }
        </div>
    )
}

export default NewFoodReviewForm;
