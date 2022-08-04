import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loginAsyncThunk = createAsyncThunk(
    'login/loginAsyncThunk',
    async (data) => {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    }
)

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        data: {},
        error: "",
        loading: false
    },
    reducers: {
        getData: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: {
        [loginAsyncThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [loginAsyncThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = "";
            state.data = action.payload;
        },
        [loginAsyncThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        }
    }
});

export const { getData } = loginSlice.actions;
export default loginSlice.reducer;



