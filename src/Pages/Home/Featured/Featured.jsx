import SectionTitle from '../../../components/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';
import Button from '../../../components/Button';

const Featured = () => {
  return (
    <div className="bg-fixed featured_item py-20 mb-24 text-white ">
      <SectionTitle
        subHeading={'---Check it out---'}
        heading={'FROM OUR MENU'}
      ></SectionTitle>
      <section className="flex items-center gap-6">
        <div className="flex-1  flex justify-end">
          <img src={featuredImg} className="w-8/12" />
        </div>
        <div className="flex-1 space-y-2 text-slate-800">
          <p>March 20, 2023</p>
          <h2>WHERE CAN I GET SOME</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
            repudiandae quis fugit fugiat pariatur voluptatibus dicta ipsam,
            beatae numquam esse sed sint quia nostrum, vitae laborum id ab enim
            placeat eligendi, eius adipisci tenetur. Quibusdam asperiores
            dignissimos laudantium illo quia perferendis distinctio facere nihil
            id voluptate, itaque nostrum voluptatem error!
          </p>

          <Button title={'Read More'} position={'text-left'}></Button>
        </div>
      </section>
    </div>
  );
};
export default Featured;
