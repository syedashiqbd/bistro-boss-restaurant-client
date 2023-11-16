import { Link } from 'react-router-dom';
import MenuItem from '../../../Shared/MenuItem/MenuItem';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';

const MenuCategory = ({ item, loading }) => {
  // to find value of Category Key in Object
  const singleCategory = new Set(item.map((item) => item.category));
  const category = Array.from(singleCategory);

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="md:grid grid-cols-2 gap-6 mb-10 mt-20">
          {item?.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
      )}
      <Link to={`/order/${category}`}>
        <Button
          title={`ORDER YOUR FAVOURITE ${category}`}
          position={'text-center'}
        ></Button>
      </Link>
    </div>
  );
};
export default MenuCategory;
