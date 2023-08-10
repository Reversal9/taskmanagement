import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    newIssueId: 0,
    newMemberId: 0
};

export const idSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        incrementIssueId: (state) => {
            state.newIssueId++;
            console.log("why run")
        },
        incrementMemberId: (state) => {
            state.newMemberId++;
            console.log("why is this not being run")
        }
    },
});

export const {
    incrementIssueId,
    incrementMemberId
} = idSlice.actions;

export const selectNewIssueId = (state) => state.id.newIssueId;
export const selectNewMemberId = (state) => state.id.newMemberId;

export default idSlice.reducer;