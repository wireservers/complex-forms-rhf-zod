
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ControlsState = { paused: boolean }
const initial: ControlsState = { paused: false }

const controls = createSlice({
  name: 'controls',
  initialState: initial,
  reducers: {
    togglePaused(s) { s.paused = !s.paused },
    setPaused(s, a: PayloadAction<boolean>) { s.paused = a.payload }
  }
})

export const { togglePaused, setPaused } = controls.actions

export const store = configureStore({ reducer: { controls: controls.reducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
