import React from 'react';
import styles from './Board.module.css';

export function DropdownContainer({ dropdownRef, children }) {
    return (
        <div
            className = {styles.appProjectBoardColumnIssueEditAssigneeDropdown}
            ref = {dropdownRef}>
                {children}
        </div>
    );
}