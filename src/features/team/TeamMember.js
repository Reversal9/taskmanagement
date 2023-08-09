import React from 'react';
import styles from './Team.module.css';

export function TeamMember({ initials, color }) {
    return (
        <div
            className = {styles.teamMemberIcon}
            style = {{
                backgroundColor: color
            }}>
            {initials}
        </div>
    );
}