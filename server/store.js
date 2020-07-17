import { configureStore } from '@reduxjs/toolkit'
import safehubsReducer from '../react-ui/src/features/safehubsSlice'

export default configureStore({
    reducer: {
        safehubs: safehubsReducer
    }
})