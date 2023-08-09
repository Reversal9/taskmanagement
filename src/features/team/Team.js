import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addMember,
    removeMember,
    editMember,
    selectMembers
} from './teamSlice';
import {
    incrementMemberId,
    selectNewMemberId
} from '../id/idSlice'
import { Modal } from './Modal';
import styles from './Team.module.css';

export function Team() {
    const newMemberId = useSelector(selectNewMemberId);
    const members = useSelector(selectMembers);
    const dispatch = useDispatch();

    function handleNameChange(name, value) {
        setNewMember(prevMember => {
            return {...prevMember, [name]: value};
        });
    }

    function handleColorChange(newColor) {
        setSelectedColor(newColor);
        handleNameChange("color", newColor);
    }

    function handleCloseForm() {
        setSelectedColor(colors[0]);
        setNewMember(null);
        setShouldShow(false);
    }

    function getInitials(member) {
        return `${member.firstName ? member.firstName[0] : ""}${member.lastName ? member.lastName[0] : ""}`;
    }

    const colors = [
        "#a4262c", "#ca5010", "#bf7034", "#407855",
        "#038387", "#40587c", "#0078d4", "#4052ab",
        "#854085", "#8764b8", "#737373", "#b67365"
    ]

    const [newMember, setNewMember] = useState(null);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [shouldShow, setShouldShow] = useState(false);

    return (
        <div
            className = {styles.team}>
                {members.map(member => {
                    return <div
                        className = {styles.teamMemberIcon}
                        style = {{
                            backgroundColor: member.color
                        }}>
                            {getInitials(member)}
                    </div>
                })}

                <button
                    className = {styles.teamAddMember}
                    onClick = {() => {
                        setNewMember({
                            memberId: newMemberId,
                            firstName: "",
                            lastName: "",
                            color: ""
                        })
                        setShouldShow(true);
                    }}>
                </button>

                <Modal
                    shouldShow = {shouldShow}
                    onRequestClose = {() => setShouldShow(false)}>
                        <span
                            className = {styles.modalBodyFormTitle}>
                                Add People
                        </span>

                        <span
                            className = {styles.modalBodyFormLabel}>
                                First Name
                        </span>

                        <input
                            className = {styles.modalBodyFormInput}
                            type = "text"
                            name = "firstName"
                            placeholder = "John"
                            value = {newMember?.firstName}
                            onChange = {(e) => {
                                handleNameChange(e.target.name, e.target.value);
                            }}
                        />

                        <span
                            className = {styles.modalBodyFormLabel}>
                                Last Name
                        </span>

                        <input
                            className = {styles.modalBodyFormInput}
                            type = "text"
                            name = "lastName"
                            placeholder = "Doe"
                            value = {newMember?.lastName}
                            onChange = {(e) => {
                                handleNameChange(e.target.name, e.target.value);
                            }}
                        />

                        <span
                            className = {styles.modalBodyFormLabel}>
                                Color
                        </span>

                        <div
                            className = {styles.modalBodyFormColors}>
                                {colors.slice(0,6).map(color => {
                                    return <button
                                        className = {styles.modalBodyFormColorButton}
                                        style = {{
                                            backgroundColor: color,
                                            outlineColor: (color === selectedColor) ? "#4382f7" : "",
                                        }}
                                        onClick = {() => {
                                            handleColorChange(color);
                                        }}>
                                    </button>
                                })}
                        </div>

                        <div
                            className = {styles.modalBodyFormColors}>
                            {colors.slice(6).map(color => {
                                return <button
                                    className = {styles.modalBodyFormColorButton}
                                    style = {{
                                        backgroundColor: color,
                                        outlineColor: (color === selectedColor) ? "#4382f7" : "",
                                    }}
                                    onClick = {() => {
                                        handleColorChange(color);
                                    }}>
                                </button>
                            })}
                        </div>

                        <div
                            className = {styles.modalBodyFormButtons}>
                                <button
                                    className = {styles.modalBodyFormCancelButton}
                                    onClick = {handleCloseForm}>
                                        Cancel
                                </button>

                                <button
                                    className = {styles.modalBodyFormConfirmButton}
                                    onClick = {() => {
                                        dispatch(addMember(newMember));
                                        handleCloseForm();
                                    }}>
                                        Add
                                </button>
                        </div>
                </Modal>
        </div>
    );
}