import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Jurados from '../../features/modulo-director/jurados'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Jurados"}))
      }, [])


    return(
        <Jurados />
    )
}

export default InternalPage