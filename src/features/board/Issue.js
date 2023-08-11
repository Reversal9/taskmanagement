import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import {
    editSummary,
    editIssueAssigneeId,
    deleteIssue
} from './boardSlice';
import {
    selectMembers
} from '../team/teamSlice';
import { TeamMember } from '../team/TeamMember';
import { DropdownContainer, DropdownMemberContainer } from "./DropdownMemberContainer";
import { DropdownItem, DropdownMemberItem } from "./DropdownMemberItem";
import styles from './Board.module.css';

export function Issue({ index, issue }) {
    const members = useSelector(selectMembers);
    const assignee = members.find(member => member.memberId === issue.assigneeId);
    const dispatch = useDispatch();

    const [showMoreDropdown, setShowMoreDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    //const assignButtonRef = useRef(null);
    const dropdownRef = useRef(null);
    const moreDropdownRef = useRef(null);

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

    function handleDeleteIssue() {
        dispatch(deleteIssue(issue));
        setShowMoreDropdown(false);
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

        if(moreDropdownRef.current && !moreDropdownRef.current.contains(e.target)) {
            setShowMoreDropdown(false);
        }
    }

    return (
        <Draggable
            draggableId = {issue.issueId}
            index = {index}>
                {(provided) => {
                    return <div
                        className = {styles.appProjectBoardColumnIssue}
                        ref = {provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                            <div
                                className = {styles.appProjectBoardColumnIssueRow}>
                                    <input
                                        style = {{flex: 1}}
                                        type = "text"
                                        name = "summary"
                                        placeholder = "What needs to be done?"
                                        value = {issue.summary}
                                        onChange = {(e) => handleSummaryChange(e.target.value)}
                                    />

                                    <button
                                        className = {`${styles.appProjectBoardColumnIssueMoreButton} ${styles.showOnHoverButton}`}
                                        onClick = {(e) => {
                                            setShowMoreDropdown(prevState => !prevState);
                                            e.stopPropagation();
                                        }}>
                                            <span>...</span>
                                    </button>

                                    {showMoreDropdown && <DropdownContainer
                                        dropdownRef = {moreDropdownRef}>
                                            <DropdownItem
                                                onClick = {handleDeleteIssue}>
                                                    <span>Delete</span>
                                            </DropdownItem>
                                    </DropdownContainer>}
                            </div>
                            <div
                                className = {styles.appProjectBoardColumnIssueGap}>
                            </div>
                            <div
                                className = {styles.appProjectBoardColumnIssueRow}>
                                    <span>{issue.issueId}</span>

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

                            {(showDropdown && members.length > 0) && <DropdownMemberContainer
                                dropdownRef = {dropdownRef}>
                                {assignee ? <DropdownMemberItem
                                    onClick = {() => handleClick({
                                        memberId: null
                                    })}
                                    unassigned = {true}
                                /> : null}
                                {members.map(member => {
                                    return (member.memberId !== assignee?.memberId) ? <DropdownMemberItem
                                        key = {`DI-${member.memberId}`}
                                        member = {member}
                                        onClick = {() => handleClick(member)}
                                    /> : null
                                })}
                            </DropdownMemberContainer>}
                        </div>
                }}
        </Draggable>
    );
}