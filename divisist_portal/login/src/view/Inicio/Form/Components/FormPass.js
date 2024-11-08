import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FormPass = () => {
    return (
      <div className="mx-full bg-white text-black  my-auto max-w-lg p-5">
         
  
          <form onSubmit={(e) => e.preventDefault()} className="w-full mt-6">
          <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="email-input"
                className="mb-1 inline-block text-sm font-medium"
              >
                Nombre's<span className="text-red-600">*</span>
              </label>
              <input
                id="nombre-input"
                type="text"
                placeholder="Ingrese su nombre completo"
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="email-input"
                className="mb-1 inline-block text-sm font-medium"
              >
                Codigo<span className="text-red-600">*</span>
              </label>
              <input
                id="codigo-input"
                type="number"
                placeholder="Ingrese su codigo"
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
  
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="password-input"
                className="mb-1 inline-block text-sm font-medium"
              >
                Contraseña<span className="text-red-600">*</span>
              </label>
              <input
                id="password-input"
                type="password"
                placeholder="Ingrese su contraseña"
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="password-input"
                className="mb-1 inline-block text-sm font-medium"
              >
                Repetir Contraseña<span className="text-red-600">*</span>
              </label>
              <input
                id="password2-input"
                type="password"
                placeholder="Ingrese su contraseña"
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
  
            <motion.button
              variants={primaryVariants}
              whileTap={{
                scale: 0.985,
              }}
              type="submit"
              className="mb-1.5 mt-3 w-full rounded bg-red-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-red-800"
            >
              Crear Cuenta
            </motion.button>
            <div className="flex justify-between mt-3">
              <motion.p variants={primaryVariants} className="text-xs">
                <Link to={`/login`} className="hover:text-red-600 underline" >
                Iniciar Sesion?
                </Link>
               
              </motion.p>
              
            </div>
  
            <hr className="mt-3  border-t border-red-600" />
        
          </form>
        </div>
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

  
  export default FormPass;


