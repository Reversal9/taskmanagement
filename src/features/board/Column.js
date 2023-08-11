import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    addIssue
} from './boardSlice';
import {
    incrementIssueId,
    selectNewIssueId
} from '../id/idSlice'
import { IssueList } from "./IssueList";
import { Issue } from './Issue'
import styles from './Board.module.css';

export function Column({ column, issues }) {
    const newIssueId = useSelector(selectNewIssueId);
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
                    className = {styles.appProjectBoardColumnTitle}>
                        <span>{`${column.title} ${issues.length ? issues.length : "0"}`}</span>
                </div>

                <IssueList>
                    {issues.map(issue => {
                        return <Issue
                            key = {issue.issueId}
                            issue = {issue}
                        />
                    })}
                </IssueList>

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
                        className = {`${styles.appProjectBoardColumnAddButton} ${column.columnId === 'column-1' ? "" : styles.showOnHoverButton}`}
                        onClick = {() => {
                            setNewIssue({
                                issueId: newIssueId,
                                summary: "",
                                assignee: null
                            });
                            setIsAddingIssue(true);
                        }}>
                            + Create issue
                    </button>
                )}
        </div>
    )
}