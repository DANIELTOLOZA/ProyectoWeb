import urlBackend from "../urlBackend";

async function listaCategorias(){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"categoria/lista",{
        method: 'GET', 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function saveModalidad(modalidad){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"categoria/save",{
        method: 'POST',
        body:JSON.stringify(modalidad), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function updateModalidad(modalidad){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"categoria/update",{
        method: 'PUT',
        body:JSON.stringify(modalidad), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

export {listaCategorias,saveModalidad,updateModalidad}