import urlBackend from "../urlBackend";

async function listaProyectosSemestre(id){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"proyecto/"+id+"/semestre",{
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

async function findByIdEstudianteProyecto(id){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"proyecto/"+id+"/estudiante",{
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function buscarIntegranteProCodigoProyecto(codigo){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"proyecto/"+codigo+"/estudiante/buscar",{
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function salirIntegranteIdProyecto(integranteId){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"proyecto/"+integranteId+"/estudiante/salir",{
        method: 'DELETE',
        headers:{
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

async function saveProyecto(proyecto){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"proyecto/save",{
        method: 'POST',
        body:JSON.stringify(proyecto), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function updateProyecto(proyecto){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"proyecto/update",{
        method: 'PUT',
        body:JSON.stringify(proyecto), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function saveIntegrante(usuario,proyectoId){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"proyecto/save/"+proyectoId+"/integrante",{
        method: 'POST',
        body:JSON.stringify(usuario), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

export {listaProyectosSemestre,saveProyecto,updateProyecto,
    findByIdEstudianteProyecto,buscarIntegranteProCodigoProyecto,saveIntegrante,salirIntegranteIdProyecto}