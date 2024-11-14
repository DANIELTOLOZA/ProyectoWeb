import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Proyectos from '../../features/modulo-director/proyectos'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Proyectos"}))
      }, [])


    return(
        <Proyectos />
    )
}

export default InternalPage