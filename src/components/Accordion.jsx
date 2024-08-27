import { useState } from "react";
const Accordion = ({ title, details1, details2, details3, details4 }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center py-2 cursor-pointer">
      <h2
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex  items-center w-full font-bold"
      >
        <span>{title}</span>
        {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
        <svg
          className="fill-red500 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </h2>
      <div
        className={`w-full grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden ">
          <ul className="grid grid-cols-4 justify-center gap-4 ">
            <li className=" flex items-center justify-center h-10">
              <div>
                <h3 className="font-bold italic">{details1}</h3>
              </div>
            </li>
            <li className="flex items-center justify-center h-10">
              {details2}
            </li>
            <li className="flex items-center justify-center items-center h-10">
              {details3}
            </li>
            <li className="flex items-center justify-center h-10">
              {details4}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
