import React from 'react';
import styles from "./Team.module.css";

export function ColorButton({ color, onClick: handleClick, isSelected }) {
    return <button
        className = {styles.modalBodyFormColorButton}
        style = {{
            backgroundColor: color
        }}
        onClick = {handleClick}>
            {isSelected && <img
                className = {styles.modalBodyFormColorButtonSelected}
                src = "icons/check-solid.svg"
                alt = "&#10004;"
            />}
    </button>
}