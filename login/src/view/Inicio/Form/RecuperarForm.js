import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { sendEmailCodigoCambioPass, verificarCodigoCambioPass } from "../../../api/Usuario/Usuario";

const RecuperarForm = () => {
  const [data, setData] = useState(); // Estado selected
  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)



  const [mensaje, setMensaje] = useState([])
  const [codigoEnviado, setCodigoEnviado] = useState(false)
  const [uuid, setUuid] = useState([])
  const [codigoUsuario, setCodigoUsuario] = useState([])
  const [intentos, setIntentos] = useState(0)
  const handleInputChange = (event) => {
    setCodigoUsuario(event.target.value);
  };

  const handleValidarEmail = (e) => {
    e.preventDefault();
    setLoading(true)
    // setErrorMessage("Usuario no registrado")
   
    sendEmailCodigoCambioPass(data)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMensaje("")
          setCodigoEnviado(true)
          setUuid(data.data)
        } else {
          setMensaje(data.mensaje)
        }
      })
      .catch(e => {
        console.log(e)
      })
      .finally(f => {
        setLoading(false)
      })


  }
  const handleValidarCodigo = (e) => {
    e.preventDefault();

    // setErrorMessage("Usuario no registrado")
   
   
    setIntentos(intentos + 1)
    if (intentos > 5) {
      setMensaje("Limite de intentos ")
      return;
    }
    setLoading(true)
    verificarCodigoCambioPass(uuid, codigoUsuario, data)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Contraseña actualizada")
          window.location.reload()
        } else {
          setMensaje(data.mensaje + "- Intento: " + intentos)
        }
      })
      .catch(e => {
        console.log(e)
      })
      .finally(f => {
        setLoading(false)
      })


  }
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
      <div className="mx-full bg-white text-black  my-auto max-w-lg p-5">
        {loading && (
          <div className="overlay">
            <div className="spinner text-red" aria-hidden="true"></div>
          </div>
        )}
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-2xl lg:text-4xl font-semibold"
        >
          Recuperar Contraseña
        </motion.h1>
        <p className="text-center mt-6">
          Ingresa tus datos para restablecer la contraseña
        </p>
        {!codigoEnviado && (
          <form onSubmit={handleValidarEmail} className="w-full mt-6">
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="codigoE"
                className="mb-1 inline-block text-sm font-medium"
              >
                Codigo<span className="text-red-600">*</span>
              </label>
              <input
                id="codigoE"
                type="number"
                name="codigoE"
                value={data?.codigoE}
                onChange={onChange}
                placeholder="Ingrese su codigo"
                className="w-full rounded border-[1px] bg-white   border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>

            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="email"
                className="mb-1 inline-block text-sm font-medium"
              >
                Email<span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="text"
                name="email"
                value={data?.email}
                onChange={onChange}
                placeholder="Ingrese su contraseña"
                className="w-full rounded border-[1px] bg-white text-dark  border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
            <p className="text-center text-red-600 mt-6">
              {mensaje}
            </p>
            <motion.button
              variants={primaryVariants}
              whileTap={{
                scale: 0.985,
              }}
              type="submit"
              className="mb-1.5 mt-3 w-full rounded bg-red-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-red-800"
            >
              Enviar codigo
            </motion.button>
            <div className="flex justify-between mt-3">
              <motion.p variants={primaryVariants} className="text-xs">
                <Link to={`/login`} className="hover:text-red-600 underline" >
                  Iniciar Sesión?
                </Link>
              </motion.p>

            </div>

            <hr className="mt-3  border-t border-red-600" />

          </form>
        )}
        {codigoEnviado && (
          <form onSubmit={handleValidarCodigo} className="w-full mt-6">
            <div className="mb-2 w-full">
              <label
                htmlFor="codigoV"
                className="mb-1 inline-block text-sm font-medium"
              >
                Codigo Verificacion<span className="text-red-600">*</span>
              </label>
              <input
                id="codigoV"
                type="number"
                value={codigoUsuario}
                onChange={handleInputChange}
                placeholder="Ingrese su codigo"
                className="w-full rounded border-[1px] bg-white   border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </div>

            <div className="mb-2 w-full">
              <label
                htmlFor="password"
                className="mb-1 inline-block text-sm font-medium"
              >
                Contraseña Nueva<span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={data?.password}
                onChange={onChange}
                placeholder="Ingrese su contraseña"
                className="w-full rounded border-[1px] bg-white text-dark  border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </div>
            
            <p className="text-center text-red-600 mt-6">
              {mensaje}
            </p>
            {intentos <= 5 ? (

              <button type="submit"
                className="mb-1.5 mt-3 w-full rounded bg-red-700 px-4 py-2 text-center font-medium text-white  hover:bg-red-800"
              >   Enviar codigo</button>
            ) : (
              <motion.div variants={primaryVariants} className="mb-2 w-full">
                <p className="text-center text-gray-900">Limite de intentos</p>
              </motion.div>
            )}



            <hr className="mt-3  border-t border-red-600" />

          </form>
        )}

      </div>
    </motion.div>

  );
};

export default RecuperarForm


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