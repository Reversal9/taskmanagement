import { createSlice } from '@reduxjs/toolkit';

export const toDo = {
    id: 0,
    title: "To Do"
};
export const inProgress = {
    id: 1,
    title: "In Progress"
}
export const done = {
    id: 2,
    title: "Done"
}

const initialState = {
    issues: [
        {id: 123, summary: "Bug during landing", assignees: [], listId: toDo.id},
        {id: 1233, summary: "Bug during this part", assignees: [], listId: inProgress.id},
        {id: 12333, summary: "Bug during that part", assignees: [], listId: done.id},
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
            state.issues.find(issue => issue.id === action.payload.id).summary = action.payload.summary;
        }
    },
});

export const {
    addIssue,
    editSummary
} = boardSlice.actions;

export const selectToDoIssues = (state) => state.board.issues.filter(issue => issue.listId === toDo.id);
export const selectInProgressIssues = (state) => state.board.issues.filter(issue => issue.listId === inProgress.id);
export const selectDoneIssues = (state) => state.board.issues.filter(issue => issue.listId === done.id);

export default boardSlice.reducer;