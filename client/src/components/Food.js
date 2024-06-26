function Food({ food }) {
    return (
        <div className="shadow-md rounded-md overflow-hidden flex items-center w-72 h-48">
            <div className="mr-4">
                <img src={food.image} alt={food.name} className="rounded-md w-24 h-24 object-cover" />
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
