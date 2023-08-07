import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addMember,
    removeMember,
    editMember,
    selectMembers
} from './teamSlice';
import styles from './Team.module.css';

export function Team() {
    const members = useSelector(selectMembers);
    const dispatch = useDispatch();

    function getInitials(member) {
        return `${member.firstName ? member.firstName[0] : ""}${member.lastName ? member.lastName[0] : ""}`;
    }

    const [newMember, setNewMember] = useState(null);
    const [isAddingMember, setIsAddingMember] = useState(false);

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

                    }}>
                </button>

                {isAddingMember &&
                    <div>
                    </div>
                }
        </div>
    );
}