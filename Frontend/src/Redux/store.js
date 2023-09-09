// We're importing several functions from Redux Toolkit and Redux Persist
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import recipesRedux from "./recipeRedux";
import ingredientsRedux from "./ingredientsRedux";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
// The storage engine for Redux Persist is imported from its library
import storage from "redux-persist/lib/storage";

// The configuration object for Redux Persist is defined here
const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

// The root reducer is created by combining the reducers for the user and cart slices of the state
const rootReducer = combineReducers({
	recipe: recipesRedux,
	ingredients: ingredientsRedux,
});

// The root reducer is wrapped with persistReducer to enable state persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// The Redux store is created with the persisted reducer
export const store = configureStore({
	reducer: persistedReducer,
	// Middleware is configured to ignore Redux Persist actions during the serializability check
	// and enabling Redux Thunk
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// The Redux Persist persistor is created with the Redux store and exported for use in the application
export let persistor = persistStore(store);
