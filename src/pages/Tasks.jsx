import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ListHeader from "../components/ListHeader";
import ListItem from "../components/ListItem";

const Tasks = () => {
  const [cookies] = useCookies(null);
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

  //sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div>
      {authToken && (
        <div className="container  pt-4">
          <div className="flex items-center justify-between gap-4 pb-10">
            <ListHeader listName={"TaskList"} getData={getData} />
          </div>
          <ul className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
            {!tasks?.length ? (
              <h2 className="highlight">No tasks yet 💔😢</h2>
            ) : (
              sortedTasks?.map((task) => (
                <ListItem key={task.id} task={task} getData={getData} />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tasks;
