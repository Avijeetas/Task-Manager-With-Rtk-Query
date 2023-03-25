import Task from "./Task";
import { useGetTasksQuery } from "../../../features/tasks/tasksApi";
import Error from "../../ui/Error";
import { useSelector } from "react-redux";
export default function TaskItems(){
    const {data: tasks, isError, isLoading, error} = useGetTasksQuery(); 
    let content = null;
    const {projectIds, search} = useSelector(state => state.filter);
    let filteredTasks = [];

    if (projectIds?.length > 0) {

      filteredTasks = tasks?.filter((task) => projectIds?.includes(task?.project?.id));
      console.log(filteredTasks);  
      filteredTasks = filteredTasks?.filter(task=> task.taskName.includes(search))
    } else {
      filteredTasks = tasks;
    }
    if (isLoading) {
        content = <div className="m-2 text-center">Loading...</div>;
    } else if (!isLoading && isError) {
        content = (
            <div className="m-2 text-center">
                <Error message={error?.data} />
            </div>
        );
    } else if (!isLoading && !isError && filteredTasks?.length === 0) {
        content = <div className="m-2 text-center">No task found!</div>;
    } else if (!isLoading && !isError && filteredTasks?.length > 0) {
        content = filteredTasks.map(task =>{  
           return <Task task = {task} map={task.id}/>
        })
    }

    return (
        <div className="lws-task-list">
            {content}
        </div>
    )
}