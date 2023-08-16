import React from 'react';
import styles from './Board.module.css';

export function DropdownMemberContainer({ dropdownRef, children }) {
    return (
        <div
            className = {styles.appProjectBoardColumnIssueEditAssigneeDropdown}
            ref = {dropdownRef}>
                {children}
        </div>
    );
}

export function DropdownContainer({ dropdownRef, children }) {
    return (
        <div
            className = {styles.appProjectBoardColumnIssueMoreButtonDropdown}
            ref = {dropdownRef}>
            {children}
        </div>
    );
}