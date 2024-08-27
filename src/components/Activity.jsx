const Activity = ({ name, description, img }) => {
  return (
    <div className="flex flex-col gap-4">
      <img src={img} alt="" />
      <h3 className="text-[#ba94ff] text-lg font-semibold">{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Activity;
