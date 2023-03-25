import { useGetTeamsQuery } from "../features/teams/teamsApi";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { useAddTaskMutation, useEditTaskMutation, useGetTaskQuery } from "../features/tasks/tasksApi";
import Error from "./ui/Error";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Form({action={}}) {
    const { data: teamMembers, isError: isTeamError } = useGetTeamsQuery();
    const { data: projects, isError: isProjectError } = useGetProjectsQuery() || {};
    const [ addTask , {isError: isFailed,isSuccess}] = useAddTaskMutation();
    const [ editTask , {isError: isEditFailed,isSuccess: isEditSuccess}] = useEditTaskMutation();
    const [task, setTask] = useState("Implement RTK Query");
    const [deadline, setDeadline] = useState("");
    const [memberId, setMemberId] = useState(undefined);
    const [projectId, setProjectId] = useState(undefined);
    const [status, setStatus] = useState("pending");
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();


//    console.log(isEditSuccess, isEditFailed)
    const { id } = useParams();

    const { data: taskData, isError: isTaskError } = useGetTaskQuery(id) || {}; 

    useEffect(()=>{
        if(action==='edit' && id && taskData && !toggle){
            const {taskName, teamMember, project, deadline, status} = taskData;
            setTask(taskName);
            setMemberId(teamMember?.id);
            setProjectId(project?.id);
            setDeadline(deadline);
            setStatus(status);
            setToggle(true)
      //      console.log(task, memberId, projectId, deadline, status)
        }
    },[action, id, taskData,task, memberId, projectId, deadline,status, toggle]);
    
    useEffect(()=>{
        if(isSuccess || isEditSuccess){
            navigate("/");
        }
    },[isSuccess, navigate, isEditSuccess])
    const handleSubmit = (e) => {
      e.preventDefault();
      if(action!=='edit'){
        addTask({
            taskName: task,
            teamMember: teamMembers.find(member => member.id == memberId),
            project: projects.find(project => project.id == projectId),
            deadline,
            status: "pending"
        })
      } else{
        editTask({
            id,
            data:{
                taskName: task,
                teamMember: teamMembers.find(member => member.id == memberId),
                project: projects.find(project => project.id == projectId),
                deadline,
                status
            }
        })
      }
        
    }
  
    return (
      <div className="container relative">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Create Task for Your Team
          </h1>
  
          <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="fieldContainer">
                <label htmlFor="lws-taskName">Task Name</label>
                <input
                  type="text"
                  name="taskName"
                  id="lws-taskName"
                  required
                  value={task}
                  placeholder="Implement RTK Query"
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
  
              <div className="fieldContainer">
                <label htmlFor="lws-teamMember">Assign To</label>
                <select
                  name="teamMember"
                  id="lws-teamMember"
                  required
                  value={memberId}
                   onChange={(e) => { setMemberId(e.target.value)}}
                 
                >
                  <option value="" hidden>Select Job</option>
                  {teamMembers?.map((member) => (
                    <option  value={member.id} key={member.id}>
                      {member?.name}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="fieldContainer">
                <label htmlFor="lws-projectName">Project Name</label>
                <select
                  id="lws-projectName"
                  name="projectName"
                  required
                    value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                >
                  <option value="" hidden>Select Project</option>
                  {projects?.map((project) => (
                    <option  value={project.id} key={project.id}>
                      {project?.projectName}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="fieldContainer">
                <label htmlFor="lws-deadline">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  id="lws-deadline"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
  
              <div className="text-right">
                <button type="submit" className="lws-submit">
                  Save
                </button>
              </div>
  
              {isTeamError || isProjectError || isFailed || isEditFailed? (
                <Error message={"there is an error occurred"} />
              ) : null}
            </form>
          </div>
        </main>
      </div>
    );
  }
  