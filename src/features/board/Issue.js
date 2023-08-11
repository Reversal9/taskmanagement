import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    editSummary,
    editIssueAssigneeId
} from './boardSlice';
import {
    selectMembers
} from '../team/teamSlice';
import { TeamMember } from '../team/TeamMember';
import { DropdownContainer } from "./DropdownContainer";
import { DropdownItem } from "./DropdownItem";
import styles from './Board.module.css';



export function Issue({ issue }) {
    const members = useSelector(selectMembers);
    const assignee = members.find(member => member.memberId === issue.assigneeId);
    const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);
    //const assignButtonRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    function handleClick(member) {
        dispatch(editIssueAssigneeId({
            issueId: issue.issueId,
            assigneeId: member.memberId
        }));
        setShowDropdown(false);
    }

    function handleSummaryChange(summary) {
        dispatch(editSummary({
            issueId: issue.issueId,
            summary: summary
        }));
    }

    function handleClickOutside(e) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
        }
    }

    return (
        <div>
            <div
                className = {styles.appProjectBoardColumnIssue}>
                    <div
                        className = {styles.appProjectBoardColumnIssueRow}>
                            <input
                                type = "text"
                                name = "summary"
                                placeholder = "What needs to be done?"
                                value = {issue.summary}
                                onChange = {(e) => handleSummaryChange(e.target.value)}
                            />
                    </div>
                    <div
                        className = {styles.appProjectBoardColumnIssueGap}>
                    </div>
                    <div
                        className = {styles.appProjectBoardColumnIssueRow}>
                            <span>{`I-${issue.issueId}`}</span>

                            <div
                                className = {styles.appProjectBoardColumnIssueRowEnd}>
                                    <TeamMember
                                        // ref = {dropdownRef}
                                        member = {assignee}
                                        onClick = {(e) => {
                                            setShowDropdown(prevState => !prevState);
                                            e.stopPropagation();
                                        }}
                                        unassigned = {!assignee}
                                        showTooltip = {true}
                                    />
                            </div>
                    </div>
            </div>

            {showDropdown && <DropdownContainer
                dropdownRef = {dropdownRef}>
                {assignee ? <DropdownItem
                    onClick = {() => handleClick({
                        memberId: null
                    })}
                    unassigned = {true}
                /> : null}
                {members.map(member => {
                    return (member.memberId !== assignee?.memberId) ? <DropdownItem
                        member = {member}
                        onClick = {() => handleClick(member)}
                    /> : null
                })}
            </DropdownContainer>}
        </div>
    );
}