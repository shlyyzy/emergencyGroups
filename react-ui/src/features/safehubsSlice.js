import { createSlice } from '@reduxjs/toolkit'

export const safehubsSlice = createSlice({
    name: 'safehubs',
    initialState: {
      hubs: []
    },
    reducers: {
      addHub: (state, action) => {
          // pass a hub to add
        state.hubs = [...state.hubs, action.payload]
      },
      deleteHub: (state, action) => {
          // pass a hub id to delete
        state.hubs = state.hubs.filter(hub => hub.id != action.payload)
      }
    }
  })
  
  export const { addHub, deleteHub } = safehubsSlice.actions
  
  // selector
  export const selectHubs = state => state.counter.hubs;

  export default safehubsSlice.reducer