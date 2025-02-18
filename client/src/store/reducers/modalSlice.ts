import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    name: string;
}

const initialState: ModalState = {
    name: '',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        closeModal(state) {
            state.name = '';
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;