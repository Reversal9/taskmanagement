import React from 'react';
import {
    toDo,
    inProgress,
    done,
    selectToDoIssues,
    selectInProgressIssues,
    selectDoneIssues
} from './boardSlice';
import { Column } from './Column';
import styles from './Board.module.css';

export function Board() {
    return (
        <div
            className ={styles.appProject}>
                <div
                    className = {styles.appProjectHeader}>
                        <p>Project Name</p>
                </div>
                <div
                    className = {styles.appProjectBoard}>
                        <Column
                            title = {toDo.title}
                            listId = {toDo.id}
                            selectIssues = {selectToDoIssues}
                        />
                        <Column
                            title = {inProgress.title}
                            listId = {inProgress.id}
                            selectIssues = {selectInProgressIssues}
                        />
                        <Column
                            title = {done.title}
                            listId = {done.id}
                            selectIssues = {selectDoneIssues}
                        />
                </div>
        </div>
    );
}