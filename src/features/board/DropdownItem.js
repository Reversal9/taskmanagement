import React from 'react';
import { TeamMember } from '../team/TeamMember';
import { getInitials } from '../team/Team';
import styles from './Board.module.css';


export function DropdownItem({ member, onClick: handleClick, unassigned = false }) {
    return (
        <div
            className = {styles.appProjectBoardColumnIssueEditAssigneeDropdownItem}
            onClick = {handleClick}>
                <TeamMember
                    initials = {getInitials(member)}
                    color = {member?.color}
                    unassigned = {unassigned}
                />
                <span>{unassigned ? "Unassigned" : `${member.firstName} ${member.lastName}`.trim()}</span>
        </div>
    );
}