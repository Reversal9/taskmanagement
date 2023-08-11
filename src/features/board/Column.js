import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
    addIssue
} from './boardSlice';
import {
    incrementIssueId,
    selectNewIssueId
} from '../id/idSlice'
import { Issue } from './Issue'
import styles from './Board.module.css';

export function Column({ index, column, issues }) {
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
        <Draggable
            draggableId = {column.columnId}
            index = {index}>
                {(provided) => {
                    return <div
                        className = {styles.appProjectBoardColumn}
                        ref = {provided.innerRef}
                        {...provided.draggableProps}>
                        <div
                            className = {styles.appProjectBoardColumnTitle}
                            {...provided.dragHandleProps}>
                            <span>{`${column.title} ${issues.length ? issues.length : "0"}`}</span>
                        </div>

                        <Droppable
                            droppableId = {column.columnId}
                            direction = "vertical"
                            type = "issue">
                            {(provided) => {
                                return <div
                                    ref = {provided.innerRef}
                                    {...provided.droppableProps}>
                                    {issues.map((issue, index) => {
                                        return <Issue
                                            key = {issue.issueId}
                                            index = {index}
                                            issue = {issue}
                                        />
                                    })}
                                    {provided.placeholder}
                                </div>
                            }}
                        </Droppable>

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
                                        dispatch(addIssue({
                                            issue: newIssue,
                                            columnId: column.columnId
                                        }));
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
                }}
        </Draggable>
    )
}