import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { Back } from "../components/Icons";

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
        <div className="flex gap-4 items-center pb-4">
          <Back
            className="w-fit-content bg-[#ba94ff] rounded cursor-pointer"
            onClick={goBack}
          />
          <h2 className="pb-0">Task manager</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            Welcome to your task manager! This is a place where your dreams take
            shape and goals become reality. Every task you complete brings you
            one step closer to your aspirations. Harness your focus, ignite your
            passion, and conquer your to-do list with confidence.
          </p>
          <div className="flex justify-start gap-4">
            <button className="w-fit" onClick={() => setShowModal(true)}>
              Add task
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
