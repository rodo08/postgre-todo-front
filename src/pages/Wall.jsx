import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import CardPost from "../components/CardPost";
import Activity from "../components/Activity";
import { useNavigate } from "react-router-dom";

const Wall = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [data, setData] = useState({
    user_email: "",
    message: "",
  });
  const [newMessages, setNewMessages] = useState([]);
  const userEmail = cookies.Email;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, user_email: userEmail });
    console.log(newMessages);
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    const message = data.message;
    console.log(message); //verificar mensaje
    console.log(data);
    await postData();
    await getData();
  };

  const postData = async () => {
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
  };

  const getData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/wallmessages`
    );
    const json = await response.json();
    console.log(json);
    setNewMessages(json);
  };

  useEffect(() => {
    getData();
  }, []);

  const goBack = () => {
    navigate("/menu");
  };

  return (
    <main className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
        <aside className="">
          <h1 className="font-semibold text-[#ba94ff] p-0">Message Wall</h1>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-10">
            <p className="text-xl ">
              Be creative and share your thoughts with the community
            </p>
            <button onClick={goBack}>Go back</button>
          </div>

          <div className=" h-[50vh] overflow-y-auto">
            <ul className="columns-1 gap-2 lg:gap-2 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
              {newMessages.length > 0 ? (
                newMessages.map((message) => (
                  <>
                    <li className=" bg-[#1f1d2b] overflow-hidden p-2 mb-2 shadow-none">
                      <CardPost
                        key={message.id}
                        userEmail={message.user_email}
                        paragraph={message.message}
                        date={message.date}
                      />
                    </li>
                  </>
                ))
              ) : (
                <p>No messages 😢💔</p>
              )}
            </ul>
          </div>
          <form
            onSubmit={sendMessage}
            className="w-full flex justify-between items-center pb-8 "
          >
            <div className="w-full flex flex-col gap-4 pt-8">
              <textarea
                name="message"
                className="w-full "
                type="text"
                maxLength="300"
                placeholder="Write a message"
                value={data.message}
                onChange={handleChange}
              />
              <button
                className="flex items-center justify-center self-end h-full"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </aside>
        <aside>
          <div className="grid grid-cols-2 gap-8">
            <Activity
              name={" ipsum dolor sit amet "}
              description={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, inventore repudiandae quod, eligendi esse quae tenetur illum, veritatis incidunt distinctio molestias. Odio, eveniet! Quas excepturi ducimus obcaecati explicabo ex pariatur!"
              }
              img={
                "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c2f893206127401.66c70d30ea133.jpg"
              }
            />
            <Activity
              name={" ipsum dolor sit amet "}
              description={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, inventore repudiandae quod, eligendi esse quae tenetur illum, veritatis incidunt distinctio molestias. Odio, eveniet! Quas excepturi ducimus obcaecati explicabo ex pariatur!"
              }
              img={
                "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c2f893206127401.66c70d30ea133.jpg"
              }
            />
            <Activity
              name={" ipsum dolor sit amet "}
              description={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, inventore repudiandae quod, eligendi esse quae tenetur illum, veritatis incidunt distinctio molestias. Odio, eveniet! Quas excepturi ducimus obcaecati explicabo ex pariatur!"
              }
              img={
                "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c2f893206127401.66c70d30ea133.jpg"
              }
            />
            <Activity
              name={" ipsum dolor sit amet "}
              description={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, inventore repudiandae quod, eligendi esse quae tenetur illum, veritatis incidunt distinctio molestias. Odio, eveniet! Quas excepturi ducimus obcaecati explicabo ex pariatur!"
              }
              img={
                "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c2f893206127401.66c70d30ea133.jpg"
              }
            />
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Wall;
