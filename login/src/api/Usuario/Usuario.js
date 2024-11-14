import urlBackend from "../urlBackend";

async function sendEmailCodigo(codigo){
    const result=await fetch(urlBackend+"usuario/codigo-registro",{
        method: 'POST',
        body:JSON.stringify(codigo), 
        headers:{
            'Content-Type': 'application/json'
        }
    });

    return result;
}

async function verificarCodigo(uuid,codigo,usuario){
    const result=await fetch(urlBackend+"usuario/registro/"+uuid+"/"+codigo,{
        method: 'POST',
        body:JSON.stringify(usuario), 
        headers:{
            'Content-Type': 'application/json'
        }
    });

    return result;
}

async function sendEmailCodigoCambioPass(codigo){
    const result=await fetch(urlBackend+"usuario/codigo-cambio",{
        method: 'POST',
        body:JSON.stringify(codigo), 
        headers:{
            'Content-Type': 'application/json'
        }
    });

    return result;
}

async function verificarCodigoCambioPass(uuid,codigo,usuario){
    const result=await fetch(urlBackend+"usuario/cambio/"+uuid+"/"+codigo,{
        method: 'POST',
        body:JSON.stringify(usuario), 
        headers:{
            'Content-Type': 'application/json'
        }
    });

    return result;
}

export {verificarCodigo ,sendEmailCodigo,sendEmailCodigoCambioPass,verificarCodigoCambioPass};