import React from "react";
import TeamCard from "./TeamCard"; // Importing the new TeamCard component
import '../Team/Team.css';

const teamMembers = [
    { name: "person1", year:"3rd Year", branch: "CSE" },
    { name: "person2", year: "3nd Year", branch: "IT" },
];

const Team = () => {
    return (
        <div className="people">
        <div className="team-container">
                {teamMembers.map((member, index) => (
                    <TeamCard
                        key={index}
                        name={member.name}
                        year={member.year}
                        branch={member.branch}
                    />
                ))}
        </div>
        </div>
    );
};

export default Team;