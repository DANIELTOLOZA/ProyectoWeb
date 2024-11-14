import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight,  } from "react-icons/fi";
import ufps from "../../../assets/img/ufps2.jpg";
import fondo from "../../../assets/img/fondo-ufps.jpg";
import ufpsLogo from "../../../assets/img/Logo-nuevo-horizontal.png";
const LayoutInicio = ({Form}) => {
  return (
    <section
      style={{
        backgroundImage: `url(${fondo})`, // Usa la imagen de fondo importada
      }}
      className="grid min-h-screen grid-cols-1 bg-slate-50 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]"
    >
      <Logo />
      {Form}
      <SupplementalContent />
    </section>
  );
};

export default LayoutInicio;



const SupplementalContent = () => {
  return (
    <div className="group sticky top-4 m-4 h-80 overflow-hidden rounded-3xl rounded-tl-[4rem] bg-gradient-to-t  md:h-[calc(100vh_-_2rem)]">
      <img
        alt="Acreditacion de alta calidad UFPS"
        src={ufps}
        className="h-full w-full  object-cover transition-all duration-500 group-hover:scale-105 "
      />

      <div className="absolute right-2 top-4 z-10">
        <FiArrowUpRight className="rotate-45 text-6xl text-indigo-200 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100" />
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-start justify-center  from-slate-950/90 to-slate-950/0 p-8"
      >
        <motion.h2
          className="mb-2 text-3xl font-semibold leading-[1.25] text-white lg:text-4xl"
          variants={primaryVariants}
        >
          Ingenieria de Sistemas
        </motion.h2>
        <motion.p
          variants={primaryVariants}
          className="mb-6 max-w-md text-xl text-gray-100"
        >
          Universidad Francisco de Puala Santander
        </motion.p>
      </motion.div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <img
      src={ufpsLogo}
      width={300}
      height={150}
      className="absolute left-[50%] top-4 -translate-x-[50%] fill-slate-950 md:left-4 md:-translate-x-0"
    />
  );
};

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const avatarVariants = {
  initial: {
    x: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

