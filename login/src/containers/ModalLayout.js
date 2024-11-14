import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddSemestresModalBody from '../features/modulo-director/semestre/components/AddLeadModalBody'
import UpdateSemestresModalBody from '../features/modulo-director/semestre/components/UpdateSemestreModalBody'
import AddModalidadModalBody from '../features/modulo-director/modalidad/components/AddModalidadModalBody'
import UpdateModalidadModalBody from '../features/modulo-director/modalidad/components/UpdateModalidadModalBody'
import AddEmpresasModalBody from '../features/modulo-director/submodalidad/components/AddEmpresasModalBody'
import UpdateEmpresasModalBody from '../features/modulo-director/submodalidad/components/UpdateEmpresasModalBody'
import AddDocumentacionModalBody from "../features/modulo-director/documentacion/components/AddDocumentacionModalBody"
import UpdateDocumentacionModalBody from "../features/modulo-director/documentacion/components/UpdateDocumentacionModalBody"
import AddIntegranteModalBody from '../features/modulo-estudiante/informacion/Components/AddIntegranteModalBody'
import AddDocumentoModalBody from '../features/modulo-estudiante/informacion/Components/AddDocumentoModalBody'
import AddJuradosModalBody from '../features/modulo-director/jurados/components/AddJuradosModalBody'
import AddProyectoJuradosModalBody from '../features/modulo-director/jurados/components/AddProyectoJuradosModalBody'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import AddFichaJuradoModalBody from '../features/modulo-estudiante/informacion/Components/AddFichaJuradoModalBody'

function ModalLayout(){


    const {isOpen, bodyType, size, extraObject, title,data} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }



    return(
        <>
        {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                {/* Loading modal body according to different modal type */}
                {
                    {
                        [MODAL_BODY_TYPES.INTEGRANTE_ADD_NEW] : <AddIntegranteModalBody closeModal={close} extraObject={extraObject}/>,
                        [MODAL_BODY_TYPES.DOCUMENTO_ADD_NEW] : <AddDocumentoModalBody closeModal={close} extraObject={extraObject} data={data}/>,
                        [MODAL_BODY_TYPES.DOCUMENTACION_ADD_NEW] : <AddDocumentacionModalBody closeModal={close} extraObject={extraObject}/>,
                        [MODAL_BODY_TYPES.FICHA_JURADO_ADD_NEW] :<AddFichaJuradoModalBody closeModal={close} extraObject={extraObject} data={data} />,    
                        [MODAL_BODY_TYPES.SEMESTRES_ADD_NEW] : <AddSemestresModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.SEMESTRES_UPDATE] : <UpdateSemestresModalBody closeModal={close} extraObject={extraObject} data={data}/>,
                             [MODAL_BODY_TYPES.MODALIDAD_ADD_NEW] : <AddModalidadModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.MODALIDAD_UPDATE] : <UpdateModalidadModalBody closeModal={close} extraObject={extraObject} data={data}/>,
                             [MODAL_BODY_TYPES.EMPRESAS_ADD_NEW] : <AddEmpresasModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.EMPRESAS_UPDATE] : <UpdateEmpresasModalBody closeModal={close} extraObject={extraObject} data={data}/>,
                             [MODAL_BODY_TYPES.JURADOS_ADD_NEW] : <AddJuradosModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.PROYECTO_JURADO_ADD_NEW] : <AddProyectoJuradosModalBody closeModal={close} extraObject={extraObject} data={data}/>,
                             [MODAL_BODY_TYPES.CONFIRMATION] : <ConfirmationModalBody extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
            </div>
            </div>
            </>
    )
}

export default ModalLayout