import { useNavigate } from "react-router-dom"
import { deleteAllcookies } from "../../Helpers/cookies";
import { useEffect } from "react";
function Logout(){
    const navigate = useNavigate();
    deleteAllcookies();
    useEffect(() =>{
        navigate("/login")
    },[])

    return(
        <></>
    )
}

export default Logout