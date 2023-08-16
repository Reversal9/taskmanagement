import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIssues } from './boardAPI';

const initialState = {
    // issues: {
    //     'T-1': {issueId: 'T-1', summary: "Users unable to log in with valid credentials.", assigneeId: null},
    //     'T-2': {issueId: 'T-2', summary: "Product prices are not being displayed correctly.", assigneeId: null},
    //     'T-3': {issueId: 'T-3', summary: "Some images in the gallery do not load.", assigneeId: null},
    //     'T-4': {issueId: 'T-4', summary: "Buttons on the main screen are misaligned.", assigneeId: null},
    //     'T-5': {issueId: 'T-5', summary: "The app crashes immediately after launching.", assigneeId: null},
    //     'T-6': {issueId: 'T-6', summary: "Notifications are showing up blank.", assigneeId: null},
    //     'T-7': {issueId: 'T-7', summary: "Data entered in the app is not syncing properly.", assigneeId: null},
    //     'T-8': {issueId: 'T-8', summary: "App significantly drains the device's battery.", assigneeId: null},
    //     'T-9': {issueId: 'T-9', summary: "Text in some areas of the app overlaps itself.", assigneeId: null},
    // },
    issues: [],
    columns: {
        'column-1': {
            columnId: 'column-1',
            title: 'To Do',
            issueIds: []
        },
        'column-2': {
            columnId: 'column-2',
            title: 'In Progress',
            issueIds: []
        },
        'column-3': {
            columnId: 'column-3',
            title: 'Done',
            issueIds: []
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
            for (let issueId in state.issues) {
                if (state.issues[issueId].assigneeId === action.payload.memberId) {
                    state.issues[issueId]['assigneeId'] = null;
                }
            }
        },
        deleteIssue: (state, action) => {
            delete state.issues[action.payload.issueId];

            for (let columnId in state.columns) {
                const index = state.columns[columnId].issueIds.indexOf(action.payload.issueId);
                if (index !== -1) {
                    state.columns[columnId].issueIds.splice(index, 1);
                    return;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIssues.fulfilled, (state, action) => {
                console.log("[GET] Successful");
                state.issues = action.payload;
            })
            .addCase(fetchIssues.rejected, (state) => {
                console.log("[GET] Unsuccessful");
            })

    }
});

export const fetchIssues = createAsyncThunk(
    'board/getIssues',
    async () => {
        const response = await getIssues();
        return response.data;
    }
);

export const {
    addIssue,
    editSummary,
    editIssueAssigneeId,
    editColumn,
    editColumnOrder,
    removeAssignee,
    deleteIssue
} = boardSlice.actions;

export const selectIssues = (state) => state.board.issues;
export const selectColumns = (state) => state.board.columns;
export const selectColumnOrder = (state) => state.board.columnOrder;

export default boardSlice.reducer;