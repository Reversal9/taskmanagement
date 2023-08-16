import React, { useEffect } from 'react';
import { Navbar } from './features/navbar/Navbar';
import { Sidebar } from './features/sidebar/Sidebar';
import { Board } from './features/board/Board';
import styles from './App.module.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues, selectIssues } from "./features/board/boardSlice";

function App() {
    const dispatch = useDispatch();
    const issues = useSelector(selectIssues);

    console.log(issues);

    useEffect(() => {
        dispatch(fetchIssues());
        console.log(issues);
    }, []);

    return (
        <div
            className = {styles.app}>
                <div
                    className = {styles.appNavbar}>
                        <Navbar />
                </div>
                <div
                    className = {styles.appContent}>
                        <div
                            className = {styles.appContentSidebar}>
                            <Sidebar />
                        </div>
                        <div
                            className = {styles.appContentBoard}>
                            <Board />
                        </div>
                </div>
        </div>
    );
}

export default App;
