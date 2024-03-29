import akashImage from "./images/avatars/akash.png"
export default function TeamMember({member}){
    const {name, avatar} = member || {}

    return (
        <div className="checkbox-container">
            <img src={avatar} className="team-avater" />
            <p className="label">{name}</p>
        </div>
    )
}