import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    issues: {
        'issue-1': {issueId: 'issue-1', summary: "Bug during landing", assigneeId: null},
        'issue-2': {issueId: 'issue-2', summary: "Bug during this part", assigneeId: null},
        'issue-3': {issueId: 'issue-3', summary: "Bug during that part", assigneeId: null},
        'issue-4': {issueId: 'issue-4', summary: "Bug during landing", assigneeId: null},
        'issue-5': {issueId: 'issue-5', summary: "Bug during this part", assigneeId: null},
        'issue-6': {issueId: 'issue-6', summary: "Bug during that part", assigneeId: null},
        'issue-7': {issueId: 'issue-7', summary: "Bug during landing", assigneeId: null},
        'issue-8': {issueId: 'issue-8', summary: "Bug during this part", assigneeId: null},
        'issue-9': {issueId: 'issue-9', summary: "Bug during that part", assigneeId: null},
    },
    columns: {
        'column-1': {
            columnId: 'column-1',
            title: 'To Do',
            issueIds: ['issue-1', 'issue-2', 'issue-3']
        },
        'column-2': {
            columnId: 'column-2',
            title: 'In Progress',
            issueIds: ['issue-4', 'issue-5', 'issue-6']
        },
        'column-3': {
            columnId: 'column-3',
            title: 'Done',
            issueIds: ['issue-7', 'issue-8', 'issue-9']
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addIssue: (state, action) => {
            state.issues[action.payload.issueId] = action.payload;
        },
        editSummary: (state, action) => {
            state.issues[action.payload.issueId].summary = action.payload.summary;
        },
        editIssueAssigneeId: (state, action) => {
            state.issues[action.payload.issueId].assigneeId = action.payload.assigneeId;
        }
    },
});

export const {
    addIssue,
    editSummary,
    editIssueAssigneeId
} = boardSlice.actions;

export const selectIssues = (state) => state.board.issues;
export const selectColumns = (state) => state.board.columns;
export const selectColumnOrder = (state) => state.board.columnOrder;

export default boardSlice.reducer;