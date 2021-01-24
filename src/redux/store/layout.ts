import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { comparePathname } from '@/utils/functions';

export interface ITabItem {
	path: string;
	title: string;
	showInTabs: boolean;
	hidden: boolean;
	pin: boolean;
}

export interface ILayoutState {
	tabsList: ITabItem[];
}

const initialState: ILayoutState = {
	tabsList: [],
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		setTabsList: (state: ILayoutState, action: PayloadAction<ITabItem[]>) => {
			state.tabsList = action.payload;
		},
		addTabItem: (state: ILayoutState, action: PayloadAction<ITabItem>) => {
			if (action.payload && action.payload.path) {
				const flag = state.tabsList.some((item) => comparePathname(item.path, action.payload.path));
				console.log(flag);
				if (!flag) {
					state.tabsList = [...state.tabsList, action.payload];
				}
			}
		},
	},
});

export const { setTabsList } = layoutSlice.actions;

export default layoutSlice.reducer;
