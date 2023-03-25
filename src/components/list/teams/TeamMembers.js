
import { useGetTeamsQuery } from "../../../features/teams/teamsApi";
import Error from "../../ui/Error";
import TeamMember from "./TeamMember";

export default function TeamMembers (){
    const {data: teamMembers, isLoading, isError, error} = useGetTeamsQuery();
    
    let content = null;

    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    } else if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                <Error message={error?.data} />
            </li>
        );
    } else if (!isLoading && !isError && teamMembers?.length === 0) {
        content = <li className="m-2 text-center">No projects found!</li>;
    } else if (!isLoading && !isError && teamMembers?.length > 0) {
        content = teamMembers.map(member =>{  
            return <TeamMember member = {member} map={member.id}/>
        })
    }

    return (
        <div className="mt-8">
        <h3 className="text-xl font-bold">Team Members</h3>
        <div className="mt-3 space-y-4">
          {content}

        </div>
      </div>
    )
}