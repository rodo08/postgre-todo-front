import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const getData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/todos/${userEmail}`
    );
    const json = await response.json();

    setTasks(json);
  };

  useEffect(() => {
    if (authToken) getData();
  }, []);

  console.log(tasks);

  //sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="w-full max-w-1080 mx-auto flex justify-center">
      <div className="w-full">
        {!authToken && <Auth />}
        {authToken && (
          <>
            <div className="pt-4">
              <div className="flex items-center justify-end gap-4 pb-10">
                <p>Welcome {userEmail}</p>
                <ListHeader listName={"TaskList"} getData={getData} />
              </div>
              <ul className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
                {sortedTasks?.map((task) => (
                  <ListItem key={task.id} task={task} getData={getData} />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default App;
