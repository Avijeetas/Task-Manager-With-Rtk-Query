import moment from 'moment'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteTaskMutation, useEditTaskStatusMutation } from '../../../features/tasks/tasksApi';
export default function Task ({task}){
    const {taskName, teamMember, project, deadline, status: projectStatus, id} = task || {};
    const day = deadline.split("-")[2];
    const month = moment(deadline).format('MMMM');
    const navigate = useNavigate();
    const [status, setStatus] = useState(projectStatus);
    const [editTaskStatus, { isLoading }] = useEditTaskStatusMutation();
    const [deleteTask]= useDeleteTaskMutation();
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        editTaskStatus({id, status: newStatus});
    }
    const deleteCompleted =(id)=>{
        setStatus(projectStatus);
        deleteTask(id);
    }
    return (
        <div className="lws-task">
                <div className="flex items-center gap-2 text-slate">
                    <h2 className="lws-date">{day}</h2>
                    <h4 className="lws-month">{month}</h4>
                </div>

                <div className="lws-taskContainer">
                    <h1 className="lws-task-title">{taskName}</h1>
                    <span className={`lws-task-badge ${project?.colorClass}`} >{project?.projectName}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                    <img src={teamMember?.avatar} className="team-avater" />
                    <p className="lws-task-assignedOn">{teamMember?.name}</p>
                    </div>
                    {projectStatus ==='complete'?
                    <button className="lws-delete" onClick={()=>deleteCompleted(`${task.id}`)}>
                    <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-600 hover:text-red-600"
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                    </svg>
                </button> :
                <button className="lws-edit" onClick={()=>navigate(`/edit/${id}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" className="w-6 h-6 text-gray-600 hover:text-indigo-600">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
                }
                    
                   
                    <select className="lws-status" value={projectStatus} onChange={(e)=>handleStatusChange(e.target.value)}>
                        <option value="pending" selected={projectStatus=='pending'} >Pending</option>
                        <option value="inProgress" selected={projectStatus=='inProgress'}>In Progress</option>
                        <option value="complete" selected={projectStatus=='complete'}>Completed</option>
                    </select>
                </div>
            </div>
    )
}

