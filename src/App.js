import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { Navbar } from './features/navbar/Navbar';
import { Sidebar } from './features/sidebar/Sidebar';
import { Board } from './features/board/Board';
import styles from './App.module.css';

function App() {
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
