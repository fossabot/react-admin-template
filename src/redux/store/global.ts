import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGlobalState {
	permissions: { [key: string]: boolean };
}

const initialState: IGlobalState = {
	permissions: {
		admin: true,
		张三: true,
		李四: true,
	},
};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setPermissions: (state: IGlobalState, action: PayloadAction<{ [key: string]: boolean }>) => {
			state.permissions = action.payload;
		},
		changePermissions: (state: IGlobalState, action: PayloadAction<{ [key: string]: boolean }>) => {
			state.permissions = { ...state.permissions, ...action.payload };
		},
	},
});

export const { setPermissions } = globalSlice.actions;

export default globalSlice.reducer;
