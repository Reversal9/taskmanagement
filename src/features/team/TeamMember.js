import React from 'react';
import styles from './Team.module.css';

export function TeamMember({ initials, color, onClick: handleClick, unassigned = false }) {
    return (
        <div
            className = {styles.teamMemberIcon}
            style = {{
                backgroundColor: (unassigned) ? "#8b93a2" : color
            }}
            onClick = {handleClick}>
                {unassigned ? <img
                    className = {styles.teamEditAssigneeUnassignedIcon}
                    src = "icons/user-solid.svg"
                    alt = "Assign"
                /> : <p>{initials}</p>
                }
        </div>
    );
}