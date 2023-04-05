import { useParams } from "react-router-dom";
import React from "react";

const Edit = () => {
    const routeParams = useParams();
    return (
        <li>
            {console.log(routeParams)}
        </li>
    )
}

export default Edit