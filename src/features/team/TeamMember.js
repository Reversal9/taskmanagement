import React from 'react';
import styles from './Team.module.css';

export function getFullName(member) {
    if (!member) {
        return "Unassigned";
    }

    return `${member.firstName} ${member.lastName}`.trim();
}

export function TeamMember({ member, onClick: handleClick, unassigned = false, showTooltip = false }) {
    function getInitials(member) {
        if (!member) {
            return null;
        }
        return `${member.firstName ? member.firstName[0] : ""}${member.lastName ? member.lastName[0] : ""}`;
    }

    return (
        <div
            className = {styles.teamMemberIcon}
            title = {showTooltip && getFullName(member)}
            style = {{
                backgroundColor: (unassigned) ? "#8b93a2" : member.color
            }}
            onClick = {handleClick}>
                {unassigned ? <img
                    className = {styles.teamEditAssigneeUnassignedIcon}
                    src = "icons/user-solid.svg"
                    alt = "Assign"
                /> : getInitials(member)
                }
        </div>
    );
}