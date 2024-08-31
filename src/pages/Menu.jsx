import {
  TaskIllustration,
  WallIllustration,
  TarotIllustration,
} from "../components/Icons.jsx";
import MenuItem from "../components/MenuItem.jsx";

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
          <li className="p-4">
            <MenuItem
              itemImage={<TarotIllustration />}
              title="Tarot hut"
              description="Get a tarot reading"
              route={"tarot-hut"}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
