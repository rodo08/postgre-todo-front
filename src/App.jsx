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
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"Holiday tick list"} getData={getData} />
          <p className="user-email">Welcome {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
};
export default App;
