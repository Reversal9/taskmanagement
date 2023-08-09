import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    members: [
        {memberId: -1, firstName: "Bob", lastName: "Ross", color: "#b67365"},
        {memberId: -2, firstName: "Chris", lastName: "Toms", color: "#8764b8"}
    ]
};

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        addMember: (state, action) => {
            state.members.push(action.payload);
        },
        removeMember: (state, action) => {
            state.members = state.members.map(member => member.memberId !== action.payload.memberId);
        },
        editMember: (state, action) => {
            state.members = state.members.map(member => {
                if (member.memberId === action.payload.memberId) {
                    return action.payload;
                }
                return member;
            });
        }
    },
});

export const {
    addMember,
    removeMember,
    editMember
} = teamSlice.actions;

export const selectMembers = (state) => state.team.members;

export default teamSlice.reducer;