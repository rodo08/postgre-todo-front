import { TaskIllustration, WallIllustration } from "../components/Icons.jsx";
import MenuItem from "../components/MenuItem.jsx";

import Tasks from "./Tasks";
import Wall from "./Wall";

const Menu = () => {
  return (
    <>
      <div className="container flex flex-col">
        <h1>Menu</h1>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <li className="p-4">
            <MenuItem
              itemImage={<TaskIllustration />}
              title="Tasks manager"
              description="Create, edit and delete tasks"
              route={"tasks"}
            />
          </li>
          <li className="p-4">
            <MenuItem
              itemImage={<WallIllustration />}
              title="Messages Wall"
              description="Share your thoughts with the community"
              route={"wall"}
            />
          </li>

          {/* <Tasks /> */}
          {/* <Wall /> */}
        </ul>
      </div>
    </>
  );
};

export default Menu;
