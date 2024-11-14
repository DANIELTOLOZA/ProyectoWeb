import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ModuloEstudiante from '../../features/modulo-estudiante'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Proyecto"}))
      }, [])


    return(
        <ModuloEstudiante />
    )
}

export default InternalPage