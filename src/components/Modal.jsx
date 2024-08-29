import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, task, getData }) => {
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    description: editMode ? task.description : "",
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();

    if (!data.title || !data.description) {
      setError("Please fill in all fields");
      setTimeout(() => setError(null), 5000);
      return;
    }
    setIsLoading(true);
    try {
      console.log(data);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("success");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        console.log("success");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-4 shadow-lg rounded-lg relative">
        <div className="flex items-center justify-between relative pb-6">
          <h2 className="text-2xl">{mode} your task</h2>
          <button
            className=" top-2 right-2"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>

        <form className="flex flex-col gap-4">
          <input
            required
            maxLength={30}
            placeholder="Task title (30 characters max)"
            name="title"
            value={data.title}
            onChange={handleChange}
            type="text"
            className=" p-2"
          />

          <textarea
            className="pt-2"
            required
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="range" className="text-lg pt-4">
            Progress
          </label>
          <input
            required
            type="range"
            id="range"
            min={"0"}
            max={"100"}
            name="progress"
            value={data.progress}
            onChange={handleChange}
            className="w-full shadow-none"
          />
          <div className="flex justify-end gap-8 items-center">
            {error && <p className="highlight">{error}</p>}
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <button
                type="submit"
                onClick={editMode ? editData : postData}
                className="self-end"
              >
                {editMode ? "Edit" : "Add"} Task
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
