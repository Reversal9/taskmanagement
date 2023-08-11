import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    issues: {
        'T-1': {issueId: 'T-1', summary: "Users unable to log in with valid credentials.", assigneeId: null},
        'T-2': {issueId: 'T-2', summary: "Product prices are not being displayed correctly.", assigneeId: null},
        'T-3': {issueId: 'T-3', summary: "Some images in the gallery do not load.", assigneeId: null},
        'T-4': {issueId: 'T-4', summary: "Buttons on the main screen are misaligned.", assigneeId: null},
        'T-5': {issueId: 'T-5', summary: "The app crashes immediately after launching.", assigneeId: null},
        'T-6': {issueId: 'T-6', summary: "Notifications are showing up blank.", assigneeId: null},
        'T-7': {issueId: 'T-7', summary: "Data entered in the app is not syncing properly.", assigneeId: null},
        'T-8': {issueId: 'T-8', summary: "App significantly drains the device's battery.", assigneeId: null},
        'T-9': {issueId: 'T-9', summary: "Text in some areas of the app overlaps itself.", assigneeId: null},
    },
    columns: {
        'column-1': {
            columnId: 'column-1',
            title: 'To Do',
            issueIds: ['T-1', 'T-2', 'T-3']
        },
        'column-2': {
            columnId: 'column-2',
            title: 'In Progress',
            issueIds: ['T-4', 'T-5', 'T-6']
        },
        'column-3': {
            columnId: 'column-3',
            title: 'Done',
            issueIds: ['T-7', 'T-8', 'T-9']
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addIssue: (state, action) => {
            state.issues[action.payload.issue.issueId] = action.payload.issue;
            state.columns[action.payload.columnId].issueIds.push(action.payload.issue.issueId);
        },
        editSummary: (state, action) => {
            state.issues[action.payload.issueId].summary = action.payload.summary;
        },
        editIssueAssigneeId: (state, action) => {
            state.issues[action.payload.issueId].assigneeId = action.payload.assigneeId;
        },
        editColumn: (state, action) => {
            state.columns[action.payload.columnId] = action.payload;
        },
        editColumnOrder: (state, action) => {
            state.columnOrder = action.payload;
        },
        removeAssignee: (state, action) => {
            for (let issue in state.issues) {
                if (issue.assigneeId === action.payload.memberId) {
                    issue['assigneeId'] = null;
                }
            }
        }
    },
});

export const {
    addIssue,
    editSummary,
    editIssueAssigneeId,
    editColumn,
    editColumnOrder,
    removeAssignee
} = boardSlice.actions;

export const selectIssues = (state) => state.board.issues;
export const selectColumns = (state) => state.board.columns;
export const selectColumnOrder = (state) => state.board.columnOrder;

export default boardSlice.reducer;