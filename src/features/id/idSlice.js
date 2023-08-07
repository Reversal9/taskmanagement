import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0
};

export const idSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        increment: (state) => {
            state.value++;
        },
    },
});

export const {
    increment
} = idSlice.actions;

export const selectId = (state) => state.id.value;

export default idSlice.reducer;