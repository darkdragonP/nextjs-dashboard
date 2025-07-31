import { createSlice } from '@reduxjs/toolkit'

const initialState : { 
    tokenList:[{"eq_id":""}]; 
    tokenSet :{};
}={
    tokenList:[{"eq_id":""}], 
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