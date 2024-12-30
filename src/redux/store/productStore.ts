import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slice/productSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 0
}

const persistedReducer = persistReducer(
    persistConfig,
    productSlice
)

export const store = configureStore({
    reducer: {
        product: persistedReducer
    },
    middleware: getDefualtMiddleware => getDefualtMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);
export const getDispatch = () => {
    return store.dispatch;
 }