import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Empresas from '../../features/modulo-director/submodalidad'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "SubModalidad"}))
      }, [])


    return(
        <Empresas />
    )
}

export default InternalPage