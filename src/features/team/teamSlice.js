import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    members: [
        {id: 1, firstName: "Bob", lastName: "Ross", color: "red"},
        {id: 2, firstName: "Chris", lastName: "Toms", color: "rebeccapurple"}
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
            state.members.map(member => member.id !== action.payload.id);
        },
        editMember: (state, action) => {
            state.members.find(member => member.id === action.payload.id)[action.payload.name] = action.payload.value;
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