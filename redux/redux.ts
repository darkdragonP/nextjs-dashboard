import { createSlice } from '@reduxjs/toolkit'

const initialState : { 
    tokenList:[{}]; 
    tokenSet :{};
}={
    tokenList:[{seq :"",
                eq_id : "",
                eq_sn :"",
                manu_nm :"",
                model_id :"",
                model_nm :"",
                model_class :"",
                model_spec:"",
                eq_state:"",
                eq_state_detail:"",
                eq_use:"",
                emp_id :"",
                emp_nm :"",
                purc_dt :"",
                dest_dt:"",}], 
    tokenSet :{},
};

const tokenSlices = createSlice({
    name:'token',
    initialState,
    reducers:{ 
        setTokenList: (state, action)=>{
            state.tokenList = action.payload;
        },
        setTokenDataset: (state, action)=>{
            state.tokenList = action.payload;
        },
    },
});

export const {setTokenList, setTokenDataset} = tokenSlices.actions;
export default tokenSlices.reducer;