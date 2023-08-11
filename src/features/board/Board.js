import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectIssues,
    selectColumns,
    selectColumnOrder
} from './boardSlice';
import { Header } from "./Header";
import { Column } from './Column';
import styles from './Board.module.css';

export function Board() {
    const issues = useSelector(selectIssues);
    const columns = useSelector(selectColumns);
    const columnOrder = useSelector(selectColumnOrder);

    return (
        <div
            className ={styles.appProject}>
                <Header />

                <div
                    className = {styles.appProjectBoard}>
                        {columnOrder.map(columnId => {
                            const column = columns[columnId];
                            const mappedIssues = column.issueIds.map(issueId => issues[issueId]);

                            return <Column
                                key = {column.columnId}
                                column = {column}
                                issues = {mappedIssues}
                            />
                        })}
                </div>
        </div>
    );
}