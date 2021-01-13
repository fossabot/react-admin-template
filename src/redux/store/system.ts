import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISystemState {
	count: number;
	systemName: string;
}

const initialState: ISystemState = {
	count: 0,
	systemName: '我是系统名称',
};

export const systemSlice = createSlice({
	name: 'system',
	initialState,
	reducers: {
		increment: (state: ISystemState) => {
			state.count += 1;
		},
		decrement: (state: ISystemState) => {
			state.count -= 1;
		},
		incrementByAmount: (state: ISystemState, action: PayloadAction<number>) => {
			state.count += action.payload;
		},
	},
});

export const { increment, decrement, incrementByAmount } = systemSlice.actions;

export default systemSlice.reducer;
