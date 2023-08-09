import React from 'react';
import {
    toDo,
    inProgress,
    done,
    selectToDoIssues,
    selectInProgressIssues,
    selectDoneIssues
} from './boardSlice';
import { Team } from '../team/Team';
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
                        <Team />
                </div>

                <div
                    className = {styles.appProjectBoard}>
                        <Column
                            title = {toDo.title}
                            listId = {toDo.listId}
                            selectIssues = {selectToDoIssues}
                        />
                        <Column
                            title = {inProgress.title}
                            listId = {inProgress.listId}
                            selectIssues = {selectInProgressIssues}
                        />
                        <Column
                            title = {done.title}
                            listId = {done.listId}
                            selectIssues = {selectDoneIssues}
                        />
                </div>
        </div>
    );
}