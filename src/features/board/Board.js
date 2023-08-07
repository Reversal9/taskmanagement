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
                        <div
                            className = {styles.appProjectHeaderDirectory}>
                                <span>Projects &nbsp; / &nbsp; Project Name</span>
                        </div>
                        <div
                            className = {styles.appProjectHeaderName}>
                                <h1>PN board</h1>
                        </div>
                        <div
                            className = {styles.appProjectHeaderAssignees}>

                        </div>
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