import routes from '../routes/sidebar'
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import { useDispatch } from 'react-redux';
import {useUserContext} from '../Context/UserContext'

function LeftSidebar(){
    const location = useLocation();

    const dispatch = useDispatch()


    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }
    const {modulo}= useUserContext()
    //const modulo=localStorage.getItem("modulo")
    return(
        <div className="drawer-side  z-30  ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="menu  pt-2 w-70 bg-base-100 min-h-full   text-base-content">
            <button className="fond-bold z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
            <XMarkIcon className="h-5 inline-block w-5"/>
            </button>
            

                <li className="mb-2 font-semibold text-xl">
                    
                    <Link to={'/'+modulo+'/welcome'}><img className="  w-10" src="/logoufps.png" alt="DashWind Logo"/>Control De Proyectos </Link> </li>
                {
                    routes.map((route, k) => {
                        if(route.path.split(["/"])[1].includes(modulo) ){
                            return(
                                <li className="" key={k}>
                                    {
                                        route.submenu ? 
                                            <SidebarSubmenu {...route}/> : 
                                        (<NavLink
                                            end
                                            to={route.path}
                                            className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                               {route.icon} {route.name}
                                                {
                                                    location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                    aria-hidden="true"></span>) : null
                                                }
                                        </NavLink>)
                                    }
                                    
                                </li>
                            )
                        }
                        
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar