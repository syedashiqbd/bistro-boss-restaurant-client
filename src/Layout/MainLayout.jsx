import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/Navbar/Navbar';

const MainLayout = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};
export default MainLayout;
