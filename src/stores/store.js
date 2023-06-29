import { configureStore } from "@reduxjs/toolkit"
import currentEntryReducer from '../features/submitFoodSlice'

export const store = configureStore({
    reducer: {
        currentState: currentEntryReducer
    }
})