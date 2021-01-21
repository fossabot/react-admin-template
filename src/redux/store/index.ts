import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import globalSliceReducer from './global';
import systemSliceReducer from './system';

const store = configureStore({
	reducer: {
		global: globalSliceReducer,
		system: systemSliceReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
