import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ChipTabs from "../../../components/Hover/ChipTabs";
import { Link } from "react-router-dom";
import { iniciarSesion } from "../../../api/home/login";
import "../../../assets/css/spinner.css";
const LoginForm = () => {
  const [selected, setSelected] = useState(""); // Estado selected
  const [data, setData] = useState(); // Estado selected
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let modulo = selected.toLowerCase()
    if (modulo === "director") {
      modulo = "app"
    }

    localStorage.setItem("modulo", modulo)

  }, [selected])
  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleIniciarSesion = (e) => {

    e.preventDefault();
    setLoading(true)

    setErrorMessage("")

    const loginDto = {
      codigo: data.codigo,
      password: data.password,
      modulo: selected.toLowerCase()
    }

    iniciarSesion(loginDto)
      .then((response) => response.json())
      .then(data => {

        if (data.success) {
          let modulo = localStorage.getItem("modulo")

          localStorage.setItem("token", data.data)

          window.location.href = '/' + modulo + '/dashboard'
        } else {
          let msg = data?.mensaje
          if (msg === "Bad credentials") {
            msg = "Contraseña Incorrecta"
          }

          setErrorMessage(msg)

        }


      })
      .catch(e => {
        console.log(e)
        setErrorMessage(e.mensaje)
      })
      .finally(f => {
        setLoading(false)
      })
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center mt-3  justify-center pb-4 pt-20 md:py-20"
    >
       {loading && (
                <div className="overlay">
                    <div className="spinner text-red" aria-hidden="true"></div>
                </div>
            )}
      <div className="mx-full bg-white text-black my-auto max-w-lg p-5">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-2xl lg:text-4xl font-semibold"
        >
          LOGIN
        </motion.h1>
        <p className="text-center mt-6">
          Ingresa tus datos para iniciar sesión
        </p>


        <form onSubmit={handleIniciarSesion} className="w-full mt-6">
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
              name="codigo"
              value={data?.codigo}
              onChange={onChange}
              placeholder="Ingrese su codigo"
              className="w-full rounded border-[1px] bg-white  border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
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
              name="password"
              value={data?.password}
              onChange={onChange}
              placeholder="Ingrese su contraseña"
              className="w-full rounded border-[1px] bg-white  border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>
          <p className="text-center text-red-600 mt-6">
            {errorMessage}
          </p>

          <motion.button
            variants={primaryVariants}
            whileTap={{
              scale: 0.985,
            }}
            type="submit"
            className="mb-1.5 mt-3 w-full rounded bg-red-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-red-800"
          >
            Iniciar Sesion
          </motion.button>
          <div className="flex justify-between mt-3">
            <motion.p variants={primaryVariants} className="text-xs">
              <Link
                to={`/recuperar-contraseña`}
                className="hover:text-red-600 underline"
              >
                Olvidaste tu contraseña?
              </Link>
            </motion.p>
            <motion.p variants={primaryVariants} className="text-xs">
              <Link
                to={`/crear-cuenta`}
                className="hover:text-red-600 underline"
              >
                Crear Cuenta?
              </Link>
            </motion.p>
          </div>

          <hr className="mt-3  border-t border-red-600" />

        </form>
        {/* <ChipTabs selected={selected} setSelected={setSelected} /> */}
      </div>
    </motion.div>
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

export default LoginForm;
