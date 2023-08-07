import React from 'react';
import { useDispatch } from 'react-redux';
import {
    editSummary
} from './boardSlice';
import styles from './Board.module.css';

export function Issue({id, summary, assignees}) {
    const dispatch = useDispatch();

    function handleSummaryChange(summary) {
        dispatch(editSummary({
            id: id,
            summary: summary,
            assignees: assignees
        }));
    }

    return (
        <div
            className = {styles.appProjectBoardColumnIssue}>
                <div
                    className = {styles.appProjectBoardColumnIssueRow}>
                        <input
                            type = "text"
                            name = "summary"
                            placeholder = "What needs to be done?"
                            value = {summary}
                            onChange = {(e) => {
                                handleSummaryChange(e.target.value);
                            }}
                        />
                </div>
                <div
                    className = {styles.appProjectBoardColumnIssueGap}>
                </div>
                <div
                    className = {styles.appProjectBoardColumnIssueRow}>
                        <span>{`I-${id}`}</span>
                </div>
        </div>
    );
}