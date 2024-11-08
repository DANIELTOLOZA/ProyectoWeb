import urlBackend from "../urlBackend";

async function listaSemestre(){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"semestre/lista",{
        method: 'GET', 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function listaSemestresActivos(){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"semestre/activos",{
        method: 'GET', 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

async function saveSemestre(semestre){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"semestre/save",{
        method: 'POST',
        body:JSON.stringify(semestre), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function updateSemestre(semestre){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"semestre/update",{
        method: 'PUT',
        body:JSON.stringify(semestre), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

export {listaSemestre,saveSemestre,listaSemestresActivos,updateSemestre}