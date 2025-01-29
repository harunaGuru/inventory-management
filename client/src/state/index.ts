import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Initial ={
    isSideBarCollapsed: boolean;
    isDarkMode: boolean;
}
const initialState: Initial ={
    isSideBarCollapsed: false,
    isDarkMode: false,
}
export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers:{
        setIsCollapsibble: (state, action: PayloadAction<boolean>) =>{
            state.isSideBarCollapsed = action.payload
        },
        setIsDarkMOde: (state, action: PayloadAction<boolean>) =>{
            state.isDarkMode = action.payload
    }
}})

export const { setIsCollapsibble, setIsDarkMOde } = globalSlice.actions
export default globalSlice.reducer