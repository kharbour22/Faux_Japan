
function Food({ food }) {
    return (
        <div className=" shadow-md rounded-md overflow-hidden flex items-center">
            <div className="mr-4">
                <img src={food.image} alt={food.name} className="rounded-md w-40 h-40 object-cover" />
            </div>
            <div>
                <h2 className="text-xl font-bold">{food.name}</h2>
                <p className="text-gray-600">{food.description}</p>
                {food.price && <p className="text-gray-800 font-semibold">${food.price}</p>}
            </div>
        </div>
    );
}

export default Food;
