import Project from "./Project";
import { useGetProjectsQuery } from "../../../features/projects/projectsApi";
import Error from "../../ui/Error";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addProjectIds } from "../../../features/FilterSlice";
export default function ProjectItems(){
    const {projectIds, search} = useSelector(state => {console.log(state); return state.filter});
    console.log(projectIds, search+" dasd")
    const {data: projects, isError, isLoading, error} = useGetProjectsQuery() || {}; 
 //   console.log(projects)
    const dispatch = useDispatch();

    const [toggle, setToggle] = useState(false);

    useEffect(() => {
    if (!toggle && projectIds?.length==0) {
        const projectsIds = projects?.map(project => project.id);
        if (projectsIds?.length > 0) {
            dispatch(addProjectIds(projectsIds));
            setToggle(true);
            }
        }
    }, [dispatch, projects, toggle, projectIds]);
  
    let content = null;
    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    } else if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                <Error message={error?.data} />
            </li>
        );
    } else if (!isLoading && !isError && projects?.length === 0) {
        content = <li className="m-2 text-center">No projects found!</li>;
    } else if (!isLoading && !isError && projects?.length > 0) {
        content = projects.map(project =>{  

            return <Project isChecked ={toggle?projectIds?.includes(project.id):true} project = {project} map={project.id}/>
        })
    }
    return (
        <div>
            <h3 className="text-xl font-bold">Projects</h3>
            <div className="mt-3 space-y-4">
                {content}
            </div>
        </div>
    )
}