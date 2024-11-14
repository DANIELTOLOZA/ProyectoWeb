import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ProyectosJurado from '../../features/modulo-jurado'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Proyecto"}))
      }, [])


    return(
        <ProyectosJurado />
    )
}

export default InternalPage