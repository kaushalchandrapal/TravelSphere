

import { createSlice } from "@reduxjs/toolkit"

export const planDataSlice = createSlice({
    name: "planInfo",
    initialState: {
        planData:[
            
        ],
    },
    reducers: {
        addPlanData:(state,action)=>{
            state.planData.push(action.payload);
        },
    },
});

export const {addPlanData} =  planDataSlice.actions;
export default planDataSlice.reducer;
