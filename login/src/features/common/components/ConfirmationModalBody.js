import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'

import { showNotification } from '../headerSlice'
import { salirIntegranteIdProyecto } from '../../../api/Proyecto/Proyecto'
import { useState } from 'react'

function ConfirmationModalBody({ extraObject, closeModal}){

    const dispatch = useDispatch()

    const { message, type, _id, index} = extraObject
    const [errorMensaje,setErrorMensaje]=useState("")

    const proceedWithYes = async() => {
        if(type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE){
            console.log(index)
            salirIntegranteIdProyecto(index.id)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.success){
                    dispatch(showNotification({message : "Proceso completado!", status : 1}))
                   setTimeout(() => {
                    window.location.reload();
                   }, 1000);
                 }else{
                    setErrorMensaje(data.mensaje);
                 }
                
            })
            .catch(e=>{
                console.log(e)
            })
            
           
        }
        closeModal()
    }

    return(
        <> 
        <p className=' text-xl mt-8 text-center'>
            {message}
        </p>

        <div className="modal-action mt-12">
                
                <button className="btn btn-outline   " onClick={() => closeModal()}>Cancel</button>

                <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>Yes</button> 

        </div>
        </>
    )
}

export default ConfirmationModalBody