import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Semestre from '../../features/modulo-director/semestre'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Semestre"}))
      }, [])


    return(
        <Semestre />
    )
}

export default InternalPage