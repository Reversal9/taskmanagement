import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import boardReducer from '../features/board/boardSlice';
import idReducer from '../features/id/idSlice'

export const store = configureStore({
    reducer: {
        board: boardReducer,
        id: idReducer
    },
});
