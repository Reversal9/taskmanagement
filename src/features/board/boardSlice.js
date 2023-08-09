import { createSlice } from '@reduxjs/toolkit';

export const toDo = {
    listId: 0,
    title: "To Do"
};
export const inProgress = {
    listId: 1,
    title: "In Progress"
}
export const done = {
    listId: 2,
    title: "Done"
}

const initialState = {
    issues: [
        {issueId: 123, summary: "Bug during landing", assignees: [], listId: toDo.listId},
        {issueId: 1233, summary: "Bug during this part", assignees: [], listId: inProgress.listId},
        {issueId: 12333, summary: "Bug during that part", assignees: [], listId: done.listId},
    ]
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addIssue: (state, action) => {
            state.issues.push(action.payload);
        },
        editSummary: (state, action) => {
            state.issues.find(issue => issue.issueId === action.payload.issueId).summary = action.payload.summary;
        }
    },
});

export const {
    addIssue,
    editSummary
} = boardSlice.actions;

export const selectToDoIssues = (state) => state.board.issues.filter(issue => issue.listId === toDo.listId);
export const selectInProgressIssues = (state) => state.board.issues.filter(issue => issue.listId === inProgress.listId);
export const selectDoneIssues = (state) => state.board.issues.filter(issue => issue.listId === done.listId);

export default boardSlice.reducer;