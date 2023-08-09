import React from 'react';
import styles from './Team.module.css';

export function TeamMember({ initials, color, onClick: handleClick }) {
    return (
        <div
            className = {styles.teamMemberIcon}
            style = {{
                backgroundColor: color
            }}
            onClick = {handleClick}>
                {initials}
        </div>
    );
}