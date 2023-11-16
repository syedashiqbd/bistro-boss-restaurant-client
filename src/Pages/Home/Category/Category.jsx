import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slid1 from '../../../assets/home/slide1.jpg';
import slid2 from '../../../assets/home/slide2.jpg';
import slid3 from '../../../assets/home/slide3.jpg';
import slid4 from '../../../assets/home/slide4.jpg';
import slid5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle';

const Category = () => {
  return (
    <div className="w-10/12 mx-auto mb-24 mt-12 ">
      <SectionTitle
      
        subHeading={'---From 11:00am to 10:00pm---'}
        heading={'ORDER ONLINE'}
      ></SectionTitle>
      <section>
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper "
        >
          <SwiperSlide>
            <img src={slid1} />
            <p className="text-center -mt-16 text-white text-3xl">SALADS</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slid2} />
            <p className="text-center -mt-16 text-white text-3xl">PIZZAS</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slid3} />
            <p className="text-center -mt-16 text-white text-3xl">SOUPS</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slid4} />
            <p className="text-center -mt-16 text-white text-3xl">DESSERTS</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slid5} />
            <p className="text-center -mt-16 text-white text-3xl">SALADS</p>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};
export default Category;
