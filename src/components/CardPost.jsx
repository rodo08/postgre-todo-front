const CardPost = ({ userEmail, paragraph, date }) => {
  return (
    <div
      className="flex
        flex-col"
    >
      <strong className="text-[#ba94ff] pb-4">{userEmail}: </strong>
      <p className="text-[#c8c1d6] pb-8" style={{ hyphens: "auto" }}>
        {paragraph}
      </p>
      <span className="text-xs text-[#ba94ff]">{date}</span>
    </div>
  );
};

export default CardPost;
