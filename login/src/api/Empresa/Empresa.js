import urlBackend from "../urlBackend";

async function listaEmpresas(){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"empresa/lista",{
        method: 'GET', 
        headers:{
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function listaEmpresasActivos(){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"empresa/activos",{
        method: 'GET', 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

async function saveEmpresa(empresa){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"empresa/save",{
        method: 'POST',
        body:JSON.stringify(empresa), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}
async function updateEmpresa(empresa){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"empresa/update",{
        method: 'PUT',
        body:JSON.stringify(empresa), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    });

    return result;
}

export {listaEmpresas,listaEmpresasActivos,saveEmpresa,updateEmpresa}