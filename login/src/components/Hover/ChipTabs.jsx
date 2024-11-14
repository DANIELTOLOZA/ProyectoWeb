import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BsPersonCheckFill } from "react-icons/bs";
const tabs = [
  {
    name: "Estudiante",
    icon: <PiStudentFill />,
  },
  {
    name: "Director",
    icon: <BsFillPersonLinesFill />,
  },
  {
    name: "Jurado",
    icon: <BsPersonCheckFill />,
  },
];

const ChipTabs = ({ selected, setSelected }) => {
  useEffect(()=>{
    localStorage.setItem("modulo",selected.toLowerCase())
    setSelected(tabs[0].name)
  },[])
 // const [selected, setSelected] = useState(tabs[0].name);

  return (
    <div className="flex justify-center">
      {" "}
      {/* Centra los ChipTabs */}
      <div className="py-6 flex items-center flex-wrap gap-2">
        {tabs.map((tab) => (
          <Chip
            text={tab.name}
            selected={selected === tab.name}
            setSelected={setSelected}
            key={tab.name}
            icon={tab.icon}
          />
        ))}
      </div>
    </div>
  );
};

const Chip = ({ text, selected, setSelected, icon }) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-gray-100 bg-red-600"
          : "text-gray-700 hover:text-gray-900 hover:bg-red-300"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
      style={{ minWidth: "100px" }} // Establecer ancho mínimo
    >
      <div className={`flex text-xl items-center justify-center ${selected ? "text-gray-100 ":"text-gray-900 " }`}>
        {icon}
      </div>

      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r border  rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
