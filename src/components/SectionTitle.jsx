const SectionTitle = ({ subHeading, heading }) => {
  return (
    <div className="text-center md:w-4/12 mx-auto ">
      <p className="text-[#D99904] italic"> {subHeading} </p>
      <h3 className="text-[#151515] uppercase text-3xl border-y-4 py-3 mb-8 mt-2">
        {heading}
      </h3>
    </div>
  );
};
export default SectionTitle;
