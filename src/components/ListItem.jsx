import { useState } from "react";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import TickIcon from "./TickIcon";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
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
    }
  };
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button className="delete" onClick={deleteItem}>
          Delete
        </button>
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
