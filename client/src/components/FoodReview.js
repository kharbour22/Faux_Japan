import Food from "./Food";


function FoodReview ({foodreview}){
    return(
       <li>
        <h2>Food Info: </h2>
        <Food food={foodreview.food}/>
        <h2> Review # {foodreview.id}</h2>
        <h2> Rating: {foodreview.rating}/5 </h2>
        <h2>Text:{foodreview.text}</h2>
        

       </li> 
    )
}
export default FoodReview