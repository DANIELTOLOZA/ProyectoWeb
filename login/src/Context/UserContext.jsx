import React, { createContext, useContext, useEffect, useState } from "react";
import { listaSemestre, listaSemestresActivos } from "../api/Semestre/Semestre";
import { listaEmpresas } from "../api/Empresa/Empresa";
import { listaCategorias } from "../api/Categoria/Categoria";
import {
  findByIdEstudianteProyecto,
  listaProyectosSemestre,
} from "../api/Proyecto/Proyecto";
import { findByUsuarioIdProyectosJurados, listaJurados } from "../api/Jurado/Jurado";
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  //Seguridad
  const [modulo, setModulo] = useState("");
  const [usuario, setUsuario] = useState();
  useEffect(() => {
    seguridad();
  }, []);
  const seguridad = () => {
    let token = localStorage.getItem("token") || "";

    if (token === "") {
      localStorage.clear();
      window.location.href = "/login";
    }
    const usuario = JSON.parse(JSON.stringify(parseJwt(token)));
    setUsuario(usuario);
    const rol = usuario?.roles[0].nombre?.split("_")[1].toLowerCase();
    localStorage.setItem("data", JSON.stringify(usuario));
    let mod = rol;
    if (mod === "director") {
      mod = "app";
    }
    setModulo(mod);
  };

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  //Modulo Estudiante
  const [integrantes, setIntegrantes] = useState([]);
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    if (modulo === "estudiante") {
      listadoEmpresas();
      proyectoEstudianteId(usuario?.id);
    }
  }, [modulo]);

  const [proyectoEstudiante, setProyectoEstudiante] = useState([]);

  const proyectoEstudianteId = (id) => {
    findByIdEstudianteProyecto(id)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data)
          setProyectoEstudiante(data.data);
          setIntegrantes(data.data?.[0]?.integrantes);
          setDocumentos(data.data[0]?.documentos);
        }
      });
  };

  //Index
  const [semestresActivos, setSemestresActivos] = useState([]);

  const listadoDeSemestresActivos = async () => {
    try {
      const response = await listaSemestresActivos();
      const data = await response.json();
     
      if (data.success) {
        setSemestresActivos(data.data);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    listadoDeSemestresActivos();
  }, []);
  //Modulo Jurado

  useEffect(() => {
    if (modulo === "jurado"){
      
      listadoProyectosdelJurado()
    } 
    
  }, [modulo]);
  //Proyectos del Jurado
  const [proyectosJurado, setProyectosJurado] = useState([]);

  const listadoProyectosdelJurado = async () => {
    try {
      const respuesta = await findByUsuarioIdProyectosJurados();
      const data = await respuesta.json();
     
      if (data.success) {
        setProyectosJurado(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Modulo Director
  const [selectedSemestre, setSelectedSemestre] = useState(null);

  //Semestres
  const [semestres, setSemestres] = useState([]);

  const listadoDeSemestres = async () => {
    try {
      const response = await listaSemestre();
      const data = await response.json();
      
      if (data.success) {
        setSemestres(data.data);
        let activo = false;
        for (const semestre of data.data) {
          if (semestre.estado) {
            activo = true;
            listadoDeProyectosSemestres(semestre.id);
          }
        }
        if (!activo) {
          let size = data.data.length;
          listadoDeProyectosSemestres(data.data[size - 1].id);
        }
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    // Buscar el semestre con estado true y establecerlo como seleccionado por defecto
    const defaultSemestre = semestres.find(semestre => semestre.estado);
    if (defaultSemestre) {
        setSelectedSemestre(defaultSemestre.id);
    }
}, [semestres]);

  const [selectSemestre, setSelectSemestre] = useState();

  const [proyectosSemestre, setProyectosSemestre] = useState([]);

  const listadoDeProyectosSemestres = async (id) => {
    try {
      const response = await listaProyectosSemestre(id);
      const data = await response.json();
      console.log("Listado de proyectos");
    
      if (data.success) {
        setProyectosSemestre(data.data);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    if (modulo === "app"){
      
      listadoDeSemestres();
      listadoEmpresas();
      listadoJurados()
    }
   
  }, [modulo]);

  useEffect(()=>{
    listadoModalidades()
  },[])
    //Modalidad
    const [modalidad, setModalidad] = useState([]);

    const listadoModalidades = async () => {
      try {
        const respuesta = await listaCategorias();
        const data = await respuesta.json();
        console.log(data)
        if (data.success) {
          setModalidad(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };


  const [jurados, setJurados] = useState([]);

  const listadoJurados = async () => {
    try {
      const respuesta = await listaJurados();
      const data = await respuesta.json();
     
      if (data.success) {
        setJurados(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  //Empresas
  const [empresas, setEmpresas] = useState([]);

  const listadoEmpresas = async () => {
    try {
      const respuesta = await listaEmpresas();
      const data = await respuesta.json();
     
      if (data.success) {
        setEmpresas(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        modalidad,setModalidad,listadoModalidades,
        setProyectosJurado,proyectosJurado,listadoProyectosdelJurado,
        selectSemestre,
        setSelectSemestre,
        listadoDeProyectosSemestres,
        selectedSemestre,
        setSelectedSemestre,
        proyectosSemestre,
        setProyectosSemestre,
        integrantes,
        setIntegrantes,
        documentos,
        setDocumentos,
        modulo,
        setModulo,
        proyectoEstudiante,
        setProyectoEstudiante,
        proyectoEstudianteId,
        semestresActivos,
        setSemestresActivos,
        semestres,
        setSemestres,
        listadoDeSemestresActivos,
        empresas,
        setEmpresas,
        listadoEmpresas,
        jurados,setJurados,listadoJurados
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
