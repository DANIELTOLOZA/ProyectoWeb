import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Modalidad from '../../features/modulo-director/modalidad'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Modalidad"}))
      }, [])


    return(
        <Modalidad />
    )
}

export default InternalPage