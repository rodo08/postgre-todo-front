import { useEffect, useState } from "react";

const ReplyModal = ({ userEmail, wallMessage, setReplyModal }) => {
  const [replies, setReplies] = useState([]);
  const [value, setValue] = useState("");

  const getReplies = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/replies/${wallMessage.id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const replies = await response.json();
      setReplies(replies);
    } catch (err) {
      console.log(err);
    }
  };

  const postReply = async () => {
    try {
      if (!value || value === "") return;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message_id: wallMessage.id,
            user_email: userEmail,
            reply_message: value,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReplies();
    postReply();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await postReply();
    await getReplies();
    setValue("");
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70 backdrop-blur-sm z-50">
      <div className="relative w-full flex flex-col h-[500px] md:w-[450px] overflow-y-auto bg-white border-[2px] border-[#ba94ff] rounded-lg p-6 z-60 mx-4">
        <button
          className="self-end shadow-none fixed"
          onClick={() => setReplyModal(false)}
        >
          Close
        </button>
        <div className="w-full flex justify-between pb-8">
          <h3 className="highlight flex text-xl font-bold text-[#ba94ff] items-center">
            {replies.length} replies
          </h3>
        </div>

        <p>
          <strong>{wallMessage.user_email}:</strong> {wallMessage.message}
        </p>
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col shadow-none">
            <label className="font-bold opacity-60 py-4">
              Write your reply
            </label>
            <div className="flex w-full gap-4">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full"
                maxLength={300}
                placeholder="Reply (max. 300 characters)"
              />
              <button onClick={onSubmit}>Reply</button>
            </div>
          </li>
          <li className="flex flex-col shadow-none">
            <ul className="flex flex-col gap-4 pt-4">
              {replies.map((reply) => (
                <li key={reply.id} className="bg-[#1f1d2b] shadow-none p-4">
                  <strong className="text-[#ba94ff]">
                    {reply.user_email}:
                  </strong>
                  <p className="text-[#c8c1d6]">{reply.reply_message}</p>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ReplyModal;
