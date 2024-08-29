import { useState } from "react";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import TickIcon from "./TickIcon";
import moment from "moment";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM D YYYY HH:mm");
  };

  const deleteItem = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos/${task.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        console.log("success");
        getData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(task.progress);
  return (
    <li className="list-item p-4">
      <div className="info-container flex flex-col gap-4  pb-4">
        <div className="flex items-center gap-4">
          <TickIcon />
          <h2 className="task-title text-xl">{task.title}</h2>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <ProgressBar progress={task.progress} />
        <p className="w-full opacity-90">{task.description}</p>
      </div>
      <p className="date py-4 from-neutral-100 text-sm opacity-50">
        {formatDate(task.date)}
      </p>

      <div className="button-container flex gap-4">
        <button className="edit" onClick={() => setShowModal(true)}>
          Edit
        </button>
        {isLoading ? (
          <h2>Deleting...</h2>
        ) : (
          <button className="delete" onClick={deleteItem}>
            Delete
          </button>
        )}
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          task={task}
          getData={getData} // Pass getData here
        />
      )}
    </li>
  );
};

export default ListItem;
