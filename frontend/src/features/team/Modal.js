import React from 'react';
import styles from './Team.module.css';

export function Modal({ shouldShow, onRequestClose, children }) {
    return shouldShow ? (
        <div
            className = {styles.modalBackground}
            onClick = {onRequestClose}>
                <div
                    className = {styles.modalBody}
                    onClick = {(e) => e.stopPropagation()}>
                        {children}
                </div>
        </div>
    ) : null;
}