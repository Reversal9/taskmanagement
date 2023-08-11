import React from 'react';
import { getFullName, TeamMember } from '../team/TeamMember';
import styles from './Board.module.css';


export function DropdownMemberItem({ member, onClick: handleClick, unassigned = false }) {
    return (
        <div
            className = {styles.appProjectBoardColumnIssueEditAssigneeDropdownItem}
            onClick = {handleClick}>
                <TeamMember
                    member = {member}
                    unassigned = {unassigned}
                />
                <span>{getFullName(member)}</span>
        </div>
    );
}

export function DropdownItem({ children, onClick: handleClick }) {
    return (
        <div
            className = {styles.appProjectBoardColumnIssueMoreButtonDropdownItem}
            onClick = {handleClick}>
                {children}
        </div>
    )
}
