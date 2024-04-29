import Food from "./Food";


function FoodReview ({foodreview}){
    return(
       <li>
        <h2> Review {foodreview.id}</h2>
        <h2> Rating: {foodreview.rating} </h2>
        <h2>Text:{foodreview.text}</h2>
        <h2>Food Info: </h2>
        <Food food={foodreview.food}/>

       </li> 
    )
}
export default FoodReview