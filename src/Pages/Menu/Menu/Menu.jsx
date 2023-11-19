import { Helmet } from 'react-helmet-async';
import Cover from '../../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
  const [menu, loading] = useMenu();
  //   'salad', 'drinks', 'popular', 'dessert', 'pizza', 'soup', 'offered'
  const salad = menu.filter((item) => item.category === 'salad');
  const dessert = menu.filter((item) => item.category === 'dessert');
  const pizza = menu.filter((item) => item.category === 'pizza');
  const soup = menu.filter((item) => item.category === 'soup');
  const offered = menu.filter((item) => item.category === 'offered');

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>

      {/* Offered part */}
      <div className='space-y-5'>
        <Cover
          img={menuImg}
          title={'our menu'}
          desc={'Would you like to try a dish?'}
        ></Cover>
        <SectionTitle
          subHeading={"---Don't miss---"}
          heading={"today's offer"}
        ></SectionTitle>
        <MenuCategory item={offered} loading={loading}></MenuCategory>
      </div>

      {/* Desserts Part */}
      <div>
        <Cover
          img={dessertImg}
          title={'Desserts'}
          desc={
            'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
          }
        ></Cover>
        <MenuCategory item={dessert} loading={loading}></MenuCategory>
      </div>
      {/* Pizzas Part */}
      <div>
        <Cover
          img={pizzaImg}
          title={'Pizza'}
          desc={
            'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.'
          }
        ></Cover>
        <MenuCategory item={pizza} loading={loading}></MenuCategory>
      </div>

      {/* Salad Part */}
      <div>
        <Cover
          img={saladImg}
          title={'Salad'}
          desc={
            'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.'
          }
        ></Cover>
        <MenuCategory item={salad} loading={loading}></MenuCategory>
      </div>
      {/* Soup Part */}
      <div>
        <Cover
          img={soupImg}
          title={'Soup'}
          desc={
            'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.'
          }
        ></Cover>
        <MenuCategory item={soup} loading={loading}></MenuCategory>
      </div>
    </div>
  );
};
export default Menu;
