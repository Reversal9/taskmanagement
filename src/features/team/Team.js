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
} from '../id/idSlice';
import colors from './colors';
import { TeamMember } from './TeamMember';
import { Modal } from './Modal';
import { InputField } from "./InputField";
import { ColorButton } from "./ColorButton";
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
        setIsEditing(false);
        setShouldShow(false);
    }

    function handleEditMember(member) {
        setNewMember({...member});
        setSelectedColor(member.color);
        setIsEditing(true);
        setShouldShow(true);
    }

    const [newMember, setNewMember] = useState(null);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [shouldShow, setShouldShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div
            className = {styles.team}>
                {members.map(member => {
                    return <TeamMember
                        member = {member}
                        onClick = {() => handleEditMember(member)}
                        showTooltip = {true}
                    />
                })}

                <button
                    className = {styles.teamAddMember}
                    onClick = {() => {
                        setNewMember({
                            memberId: newMemberId,
                            firstName: "",
                            lastName: "",
                            color: colors[0]
                        });
                        setShouldShow(true);
                    }}>
                        <img
                            className = {styles.teamAddMemberIcon}
                            src = "icons/user-plus-solid.svg"
                            alt = "+"
                        />
                </button>

                <Modal
                    shouldShow = {shouldShow}
                    onRequestClose = {() => setShouldShow(false)}>
                        <span
                            className = {styles.modalBodyFormTitle}>
                                {isEditing ? "Edit Person" : "Add People"}
                        </span>

                        <InputField
                            header = "First Name"
                            name = "firstName"
                            placeholder = "John"
                            value = {newMember?.firstName}
                            onChange = {(e) => handleNameChange(e.target.name, e.target.value)}
                        />

                        <InputField
                            header = "Last Name"
                            name = "lastName"
                            placeholder = "Doe"
                            value = {newMember?.lastName}
                            onChange = {(e) => handleNameChange(e.target.name, e.target.value)}
                        />

                        <span
                            className = {styles.modalBodyFormLabel}>
                                Color
                        </span>

                        <div
                            className = {styles.modalBodyFormColors}>
                                {colors.slice(0,6).map(color => {
                                    return <ColorButton
                                        color = {color}
                                        onClick = {() => {
                                            handleColorChange(color)
                                        }}
                                        isSelected = {color === selectedColor}
                                    />
                                })}
                        </div>

                        <div
                            className = {styles.modalBodyFormColors}>
                            {colors.slice(6).map(color => {
                                return <ColorButton
                                    color = {color}
                                    onClick = {() => {
                                        handleColorChange(color)
                                    }}
                                    isSelected = {color === selectedColor}
                                />
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
                                        // Check if inputs are filled or not
                                        if (isEditing) {
                                            dispatch(editMember(newMember));
                                        } else {
                                            dispatch(addMember(newMember));
                                            dispatch(incrementMemberId());
                                            console.log("adding")
                                        }
                                        handleCloseForm();
                                    }}>
                                        {isEditing ? "Edit" : "Add"}
                                </button>
                        </div>
                </Modal>
        </div>
    );
}