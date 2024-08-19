import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const signOut = () => {
    console.log("Sign out");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="list-header">
      {/* <h1>{listName}</h1> */}
      <div className="w-full flex justify-end gap-4">
        <button className="" onClick={() => setShowModal(true)}>
          Add
        </button>
        <button className="" onClick={signOut}>
          Sign out
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};
export default ListHeader;
