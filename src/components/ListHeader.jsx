import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const ListHeader = ({ listName, getData }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const goBack = () => {
    navigate("/menu");
  };

  return (
    <div className="container">
      <div className=" flex flex-col gap-4">
        <h2>Welcome to your task manager</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            a place where your dreams take shape and goals become reality. Every
            task you complete brings you one step closer to your aspirations.
            Harness your focus, ignite your passion, and conquer your to-do list
            with confidence.
          </p>
          <div className="flex gap-4">
            <button className="" onClick={() => setShowModal(true)}>
              Add task
            </button>
            <button className="" onClick={goBack}>
              Go back
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};
export default ListHeader;
