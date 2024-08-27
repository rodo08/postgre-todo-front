const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="maxWidth mx-auto flex justify-center py-8 mt-8 bg-[#ba94ff]">
      <h3 className="text-white text-semibold text-2xl">eclectica © {year}</h3>
    </div>
  );
};
export default Footer;
