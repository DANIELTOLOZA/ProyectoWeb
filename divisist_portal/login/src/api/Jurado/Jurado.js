import urlBackend from "../urlBackend";

async function listaJurados(){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"jurado/lista",{
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function findByUsuarioIdProyectosJurados(){
    const token=localStorage.getItem("token")
    const usuarioId=JSON.parse(localStorage.getItem("data")).id
    const result=await fetch(urlBackend+"jurado/"+usuarioId+"/lista",{
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

async function saveJurado(jurado,categoriaId){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"jurado/save/"+categoriaId+"/categoria",{
        method: 'POST',
        body:JSON.stringify(jurado), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

async function saveComentarioJurado(comentario){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"jurado/save/comentario",{
        method: 'POST',
        body:JSON.stringify(comentario), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

async function asignarJuradoProyecto(proyectoId,juradoId){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"jurado/save/"+proyectoId+"/proyecto/"+juradoId+"/jurado",{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
export {listaJurados,saveComentarioJurado,findByUsuarioIdProyectosJurados,saveJurado,asignarJuradoProyecto}