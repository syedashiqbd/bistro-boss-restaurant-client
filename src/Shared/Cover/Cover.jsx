import { Parallax } from 'react-parallax';

const Cover = ({ img, title, desc }) => {
  return (
    <Parallax
      className="object-cover"
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      strength={-200}
    >
      <div className="hero h-[600px] mb-10">
        <div className=" w-8/12 h-[300px] bg-black hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5">{desc}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};
export default Cover;
