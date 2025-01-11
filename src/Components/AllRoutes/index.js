import { useRoutes } from "react-router-dom";
import { routes } from "../../Routes"

function AllRoutes() {
    const ele = useRoutes(routes);
    // console.log(ele)
    return (
        <>
        {ele}
        </>
    )
}

export default AllRoutes;