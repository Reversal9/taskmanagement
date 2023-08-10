import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    toDo,
    addIssue
} from './boardSlice';
import {
    incrementIssueId,
    selectNewIssueId
} from '../id/idSlice'
import { Issue } from './Issue'
import styles from './Board.module.css';

export function Column({ title, listId, selectIssues }) {
    const newIssueId = useSelector(selectNewIssueId);
    const issues = useSelector(selectIssues);
    const dispatch = useDispatch();

    const [newIssue, setNewIssue] = useState(null);
    const [isAddingIssue, setIsAddingIssue] = useState(false);

    function handleSummaryChange(summary) {
        setNewIssue(prevIssue => {
            return {...prevIssue, summary: summary};
        });
    }

    return (
        <div
            className = {styles.appProjectBoardColumn}>
                <div
                    className = {styles.appProjectBoardColumnHeader}>
                        <span>{`${title} ${issues.length ? issues.length : ""}`}</span>
                </div>

                {issues.map(issue => {
                    return <Issue
                        issueId = {issue.issueId}
                        summary = {issue.summary}
                        assigneeId = {issue.assigneeId}
                    />
                })}

                {isAddingIssue ? (
                    <div
                        className = {styles.appProjectBoardColumnAddIssue}>
                            <input
                                type = "text"
                                name = "summary"
                                placeholder = "What needs to be done?"
                                value = {newIssue.summary}
                                onChange = {(e) => handleSummaryChange(e.target.value)}
                            />
                            <button
                                className = {styles.appProjectBoardColumnAddIssueConfirmButton}
                                onClick = {() => {
                                    dispatch(addIssue(newIssue));
                                    dispatch(incrementIssueId());
                                    setNewIssue(null);
                                    setIsAddingIssue(false);
                                }}>
                            </button>
                    </div>
                ) : (
                    <button
                        className = {`${styles.appProjectBoardColumnAddButton} ${listId === toDo.listId ? "" : styles.showOnHoverButton}`}
                        onClick = {() => {
                            setNewIssue({
                                issueId: newIssueId,
                                summary: "",
                                assignee: null,
                                listId: listId
                            });
                            setIsAddingIssue(true);
                        }}>
                            + Create issue
                    </button>
                )}
        </div>
    )
}