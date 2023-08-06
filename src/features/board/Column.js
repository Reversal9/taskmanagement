import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    toDo,
    addIssue
} from './boardSlice';
import {
    selectId,
    increment
} from '../id/idSlice'
import { Issue } from './Issue'
import styles from './Board.module.css';

export function Column({title, listId, selectIssues}) {
    const id = useSelector(selectId);
    const issues = useSelector(selectIssues);
    const dispatch = useDispatch();

    const [newIssue, setNewIssue] = useState(null);
    const [isAddingIssue, setIsAddingIssue] = useState(false);

    function handleSummaryChange(summary) {
        setNewIssue(issue => {
            return {...issue, summary: {summary}};
        })
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
                        id = {issue.id}
                        summary = {issue.summary}
                        assignees = {issue.assignees}
                    />
                })}

                {isAddingIssue ? (
                    <div
                        className ={styles.appProjectBoardColumnAddIssue}>
                            <input
                                type = "text"
                                name = "summary"
                                placeholder = "What needs to be done?"
                                value = {newIssue.summary}
                                onChange = {(e) => {
                                    handleSummaryChange(e.target.value);
                                }}
                            />
                            <button
                                className = {styles.appProjectBoardColumnAddIssueConfirmButton}
                                onClick = {() => {
                                dispatch(addIssue(newIssue));
                                dispatch(increment());
                                setNewIssue(null);
                                setIsAddingIssue(false);
                            }}>
                            </button>
                    </div>
                ) : (
                    <button
                        className = {`${styles.appProjectBoardColumnAddButton} ${listId === toDo.id ? "" : styles.showOnHoverButton}`}
                        onClick = {() => {
                        const newIssue = {
                            id: id,
                            summary: "",
                            assignees: [],
                            listId: listId
                        }
                        setNewIssue(newIssue);
                        setIsAddingIssue(true);
                    }}>
                        + Create issue
                    </button>
                )}
        </div>
    )
}