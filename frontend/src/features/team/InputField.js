import React from 'react';
import styles from './Team.module.css';

export function InputField({ header, name, placeholder, value, onChange: handleChange }) {
    return (
        <div
            className = {styles.modalBodyFormInputField}>
                <span
                    className = {styles.modalBodyFormLabel}>
                        {header}
                </span>

                <input
                    className = {styles.modalBodyFormInput}
                    type = "text"
                    name = {name}
                    placeholder = {placeholder}
                    value = {value}
                    onChange = {handleChange}
                />
        </div>
    );
}