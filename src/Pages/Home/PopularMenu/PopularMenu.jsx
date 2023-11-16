import SectionTitle from '../../../components/SectionTitle';
import MenuItem from '../../../Shared/MenuItem/MenuItem';
import useMenu from '../../../Hooks/useMenu';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';

const PopularMenu = () => {
  //   const [menu, setMenu] = useState();
  //   useEffect(() => {
  //     fetch('menu.json')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const popularItem = data.filter((item) => item.category === 'popular');
  //         setMenu(popularItem);
  //       });
  //   }, []);
  const [menu, loading] = useMenu();
  const popular = menu.filter((item) => item.category === 'popular');

  return (
    <section>
      <SectionTitle
        subHeading={'---Check it out---'}
        heading={'From our menu'}
      ></SectionTitle>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="md:grid grid-cols-2 gap-6 mb-10">
          {popular?.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
      )}
      <div className="mb-20">
        <Button title={'View Full Menu'} position={'text-center'}></Button>
      </div>
    </section>
  );
};
export default PopularMenu;
