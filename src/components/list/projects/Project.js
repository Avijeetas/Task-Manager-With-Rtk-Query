import { addProjectId, deleteId } from "../../../features/FilterSlice"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
export default function Project({project, isChecked}){
    const {colorClass, projectName} = project || {}
    const dispatch = useDispatch();
    const [check, setCheck] = useState(isChecked)
    
    const unchecked=(id)=>{
        if(check)
            dispatch(deleteId(id))
        else
            dispatch(addProjectId(parseInt(id)));
        setCheck(!check)  ;  
    }
    return (
        <div className="checkbox-container">
            <input type="checkbox" className={colorClass} checked={check} value={project.id} onChange={()=>unchecked(`${project.id}`)}/>
            <p className="label">{projectName}</p>
        </div>
    )
}