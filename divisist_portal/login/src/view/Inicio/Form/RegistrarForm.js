import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "../../../assets/css/spinner.css";
import { sendEmailCodigo, verificarCodigo } from "../../../api/Usuario/Usuario";
const RegistrarForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    password: '',
    password2: ''
  });

  const [mensaje, setMensaje] = useState([])
  const [codigoEnviado, setCodigoEnviado] = useState(false)
  const [uuid, setUuid] = useState([])
  const [codigoUsuario, setCodigoUsuario] = useState([])
  const [intentos, setIntentos] = useState(0)
  const handleInputChange = (event) => {
    setCodigoUsuario(event.target.value);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("")
    if (formData.password !== formData.password2) {
      setMensaje("Las contraseñas no coinciden")
      return
    }

    const data = {
      email: formData.email,
      codigoE:formData.codigo
    }
    setLoading(true)
    sendEmailCodigo(data)
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
  };

  const handleSubmitVerificaCodigo = (e) => {
    e.preventDefault();
    
    setIntentos(intentos+1)
    if(intentos>5){
      setMensaje("Limite de intentos ")
      return ;
    }
    setLoading(true)
    verificarCodigo(uuid,codigoUsuario,formData)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Usuario registrado")
        window.location.reload()
      } else {
        setMensaje(data.mensaje+"- Intento: "+intentos)
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
      className="flex items-center mt-3 justify-center pb-4 pt-20 md:py-20"
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
          Registrarse
        </motion.h1>

        {!codigoEnviado ? (
          <form onSubmit={handleSubmit} className="w-full mt-6">
            <p className="text-center mt-6">
              Ingresa tus datos para registrarse
            </p>

            <motion.div variants={primaryVariants} className="mb-2 w-full mt-3">
              <label
                htmlFor="nombre"
                className="mb-1 inline-block text-sm font-medium"
              >
                Nombre's<span className="text-red-600">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Ingrese su nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="codigo"
                className="mb-1 inline-block text-sm font-medium"
              >
                Codigo<span className="text-red-600">*</span>
              </label>
              <input
                id="codigo"
                type="number"
                placeholder="Ingrese su codigo"
                value={formData.codigo}
                onChange={handleChange}
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="email"
                className="mb-1 inline-block text-sm font-medium"
              >
                Correo <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="text"
                placeholder="Ingrese su Correo Institucional"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>

            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="password"
                className="mb-1 inline-block text-sm font-medium"
              >
                Contraseña<span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="password2"
                className="mb-1 inline-block text-sm font-medium"
              >
                Repetir Contraseña<span className="text-red-600">*</span>
              </label>
              <input
                id="password2"
                type="password"
                placeholder="Ingrese su contraseña"
                value={formData.password2}
                onChange={handleChange}
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <p className="text-center text-red-700">{mensaje}</p>
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
                <Link to={`/login`} className="hover:text-red-600 underline">
                  Iniciar Sesion?
                </Link>
              </motion.p>
            </div>

            <hr className="mt-3 border-t border-red-600" />
          </form>
        ) : (
          <form onSubmit={handleSubmitVerificaCodigo} className="w-full mt-6">
            <p className="text-center mt-6">
              Se envio un codigo  al email:
            </p>
            <p className="text-center text-sm font-bold mt-1">
              {formData?.email}
            </p>


            <motion.div variants={primaryVariants} className="mb-2 w-full mt-6">
              <label
                htmlFor="codigov"
                className="mb-1 inline-block text-sm font-medium"
              >
                Codigo de verificacion<span className="text-red-600">*</span>
              </label>
              <input
                id="codigov"
                type="number"
                placeholder="Ingrese el codigo de verificacion"
                value={codigoUsuario}
                onChange={handleInputChange}
                className="w-full rounded border-[1px] bg-white border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>


            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <p className="text-center text-red-700">{mensaje}</p>
            </motion.div>


            {intentos <=5 ? (
               <button type="submit"
               className="mb-1.5 mt-3 w-full rounded bg-red-700 px-4 py-2 text-center font-medium text-white  hover:bg-red-800"
             >Confirmar Codigo</button>
            ):(
              <motion.div variants={primaryVariants} className="mb-2 w-full">
              <p className="text-center text-gray-900">Limite de intentos</p>
            </motion.div> 
            )}
           

            <hr className="mt-3 border-t border-red-600" />
          </form>
        )}
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

export default RegistrarForm;
