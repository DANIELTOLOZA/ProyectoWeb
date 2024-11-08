import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Documentacion from '../../features/modulo-director/documentacion'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Documentación"}))
      }, [])


    return(
        <Documentacion />
    )
}

export default InternalPage