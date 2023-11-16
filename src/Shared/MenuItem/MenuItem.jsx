const MenuItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="flex gap-8 ">
      <img
        src={image}
        className="w-[90px], h-[80px] object-cover"
        style={{ borderRadius: '0 200px 200px' }}
      />
      <div>
        <h2 className=" uppercase text-xl text-[#151515]">
          {name} --------------
        </h2>
        <p className="text-[#737373]">{recipe}</p>
      </div>
      <p className="text-[#BB8506] text-xl">${price}</p>
    </div>
  );
};
export default MenuItem;
