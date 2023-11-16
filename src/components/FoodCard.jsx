import Button from './Button';

const FoodCard = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} />
      </figure>
      <p className="bg-black text-white absolute right-0 mr-5 mt-5 py-1.5 px-3 rounded">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center ">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions ">
          <button className="uppercase btn btn-outline border-0  border-b-4 border-orange-400 bg-slate-100">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default FoodCard;
