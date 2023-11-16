import { useState } from 'react';
import Cover from '../../../Shared/Cover/Cover';
import orderImg from '../../../assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import Loading from '../../../components/Loading';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'offered'];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);

  const [menu, loading] = useMenu();
  //   'salad', 'drinks', 'popular', 'dessert', 'pizza', 'soup', 'offered'
  const salad = menu.filter((item) => item.category === 'salad');
  const desserts = menu.filter((item) => item.category === 'dessert');
  const pizza = menu.filter((item) => item.category === 'pizza');
  const soup = menu.filter((item) => item.category === 'soup');
  const offered = menu.filter((item) => item.category === 'offered');

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>
      <Cover
        img={orderImg}
        title={'our shop'}
        desc={'Would you like to try a dish?'}
      ></Cover>

      <div className="text-center my-20">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soup</Tab>
            <Tab>Dessert</Tab>
            <Tab>Offered</Tab>
          </TabList>
          <TabPanel>
            {loading ? (
              <Loading></Loading>
            ) : (
              <OrderTab items={salad}></OrderTab>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Loading></Loading>
            ) : (
              <OrderTab items={pizza}></OrderTab>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? <Loading></Loading> : <OrderTab items={soup}></OrderTab>}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Loading></Loading>
            ) : (
              <OrderTab items={desserts}></OrderTab>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Loading></Loading>
            ) : (
              <OrderTab items={offered}></OrderTab>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
export default Order;
