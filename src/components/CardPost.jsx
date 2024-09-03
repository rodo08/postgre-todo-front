import { UnLike, Liked, Reply } from "./Icons";

const CardPost = ({
  userEmail,
  paragraph,
  date,
  setReplyModal,
  replies,
  likes,
  state,
  handleLike,
}) => {
  return (
    <div className="flex flex-col">
      <strong className="text-[#ba94ff] pb-4">{userEmail}: </strong>
      <p className="text-[#c8c1d6] pb-8" style={{ hyphens: "auto" }}>
        {paragraph}
      </p>
      <div>
        <ul className="flex gap-4 pb-4">
          <li className="flex items-center bg-transparent shadow-none cursor-pointer gap-1">
            {!state ? (
              <UnLike onClick={() => handleLike()} />
            ) : (
              <Liked onClick={() => handleLike()} />
            )}

            <span className="text-[#ba94ff] text-sm">{likes}</span>
          </li>
          <li className="flex items-center bg-transparent shadow-none cursor-pointer gap-1">
            <Reply onClick={() => setReplyModal(true)} />
            <span className="text-[#ba94ff] text-sm">{replies}</span>
          </li>
        </ul>
      </div>
      <span className="text-xs text-[#ba94ff]">{date}</span>
    </div>
  );
};

export default CardPost;
