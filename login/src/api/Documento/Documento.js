import urlBackend from "../urlBackend";


async function saveFileApi(id,idDocumento,file){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"documento/save/"+id+"/tipo/"+idDocumento,{
        method:'POST',
        body:file,
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;

}
async function saveFichaJuradoApi(id,file){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"documento/save/"+id+"/ficha",{
        method:'POST',
        body:file,
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;

}

async function downloadFileApi(id){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"documento/download/"+id,{
        method:'GET',
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;
}
async function downloadFichaJuradoApi(id){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"documento/download/"+id+"/ficha",{
        method:'GET',
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;
}


export {saveFileApi ,downloadFileApi,saveFichaJuradoApi,downloadFichaJuradoApi}