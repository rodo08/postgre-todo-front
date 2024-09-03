import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import CardPost from "../components/CardPost";
import Activity from "../components/Activity";
import { useNavigate } from "react-router-dom";
import { Back } from "../components/Icons";
import moment from "moment";
import ReplyModal from "../components/ReplyModal";

const Wall = () => {
  const [cookies] = useCookies(null);
  const [data, setData] = useState({
    user_email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newMessages, setNewMessages] = useState([]);
  const [replyModal, setReplyModal] = useState(false);
  const [wallMessage, setWallMessage] = useState(null);
  const [likesNumber, setLikesNumber] = useState(null);
  const userEmail = cookies.Email;
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM D YYYY HH:mm");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, user_email: userEmail });
    console.log(newMessages);
  };
  const sendMessage = async (e) => {
    e.preventDefault();

    await postData();
    await getData();
  };

  const postData = async () => {
    setIsLoading(true);

    try {
      if (!data.message || data.message === "") return;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/wallmessages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: data.user_email,
            message: data.message,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setNewMessages([...newMessages, data.message]);
        setData({ ...data, message: "" }); // Limpiar el textarea
        console.log("Message sent successfully:", result);
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error(
        "An error occurred while sending the message:",
        error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/wallmessages`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setNewMessages(result);
    } catch (error) {
      console.error("An error occurred while fetching data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addLike = async (messageId) => {
    try {
      if (!messageId || !userEmail) return;

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/wallmessages/${messageId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: userEmail,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to like/unlike the post: ${errorText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Error adding like:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const goBack = () => {
    navigate("/menu");
  };

  const getMessage = (message) => {
    setWallMessage(message);
  };

  const handleLike = async (messageId) => {
    const result = await addLike(messageId);
    if (result) {
      await getData();
    }
  };

  return (
    <main className="flex flex-col md:flex-row gap-10 relative">
      <div className="w-full flex-1 flex md:w-2/3">
        <aside className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-10">
            <div className="flex flex-col">
              <div className="flex gap-4 items-center pb-4">
                <Back
                  className="w-fit-content bg-[#ba94ff] rounded cursor-pointer"
                  onClick={goBack}
                />
                <h2 className="pb-0"> Wall messages</h2>
              </div>
              <p>Be creative and share your thoughts with the community</p>
            </div>
          </div>

          <form
            onSubmit={sendMessage}
            className="w-full flex justify-between items-center pb-8 "
          >
            {/* <div className="w-full flex flex-col gap-4 pt-8"> */}
            <div className="w-full flex items-center">
              <textarea
                name="message"
                className="flex-1 mr-2 resize-none"
                type="text"
                maxLength="300"
                placeholder="Write a message"
                value={data.message}
                onChange={handleChange}
              />
              <div className="flex flex-col items-center gap-4">
                <button className="flex-shrink-0" type="submit">
                  Send
                </button>
                <button className="flex-shrink-0" onClick={getData}>
                  {isLoading ? "Loading..." : "Refresh"}
                </button>
              </div>
            </div>
          </form>

          <div className="flex-1  bg-secondary overflow-y-auto mb-4 py-4 h-[500px] rounded-lg">
            <ul className="columns-1 gap-2 lg:gap-2 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
              {newMessages.length > 0 ? (
                newMessages.map((message) => (
                  <li
                    key={message.id}
                    className="bg-[#1f1d2b] overflow-hidden p-2 mb-2 shadow-none"
                    onClick={() => getMessage(message)}
                  >
                    <CardPost
                      userEmail={message.user_email}
                      paragraph={message.message}
                      date={formatDate(message.date)}
                      setReplyModal={setReplyModal}
                      wallMessage={wallMessage}
                      newMessages={newMessages}
                      likes={message.like_count}
                      state={message.liked}
                      handleLike={() => handleLike(message.id)}
                    />
                  </li>
                ))
              ) : (
                <p>No messages 😢💔</p>
              )}
            </ul>
            {!replyModal ? null : (
              <ReplyModal
                setReplyModal={setReplyModal}
                userEmail={userEmail}
                wallMessage={wallMessage}
              />
            )}
          </div>
        </aside>
      </div>
      <aside className="md:w-1/3  bg-muted">
        <ul className="space-y-2">
          <li className="bg-background py-2 rounded shadow-none">
            <Activity
              name={" ipsum dolor sit amet "}
              description={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, inventore repudiandae quod, eligendi esse quae tenetur illum, veritatis incidunt distinctio molestias. Odio, eveniet! Quas excepturi ducimus obcaecati explicabo ex pariatur!"
              }
              img={
                "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c2f893206127401.66c70d30ea133.jpg"
              }
            />
          </li>
        </ul>
      </aside>
    </main>
  );
};

export default Wall;
