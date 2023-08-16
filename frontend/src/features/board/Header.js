import React from 'react';
import { Team } from "../team/Team";
import styles from "./Board.module.css";

export function Header() {
    return (
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
    );
}