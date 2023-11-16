import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/Navbar/Navbar';

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes('login') || location.pathname.includes('signup');
  return (
    <div className="max-w-[1280px] mx-auto">
      {noHeaderFooter || <NavBar></NavBar>}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};
export default MainLayout;
