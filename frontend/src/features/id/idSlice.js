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
        },
        incrementMemberId: (state) => {
            state.newMemberId++;
        }
    },
});

export const {
    incrementIssueId,
    incrementMemberId
} = idSlice.actions;

export const selectNewIssueId = (state) => `I-${state.id.newIssueId}`;
export const selectNewMemberId = (state) => `M-${state.id.newMemberId}`;

export default idSlice.reducer;