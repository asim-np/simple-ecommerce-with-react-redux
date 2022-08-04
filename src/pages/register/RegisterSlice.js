import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const registerAsyncThunk = createAsyncThunk(
    'register/registerAsyncThunk',
    async (data) => {
        const response = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    }
)

export const RegisterSlice = createSlice({
    name: "register",
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
        [registerAsyncThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [registerAsyncThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = "";
            state.data = action.payload;
        },
        [registerAsyncThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        }
    }
});

export const { getData } = RegisterSlice.actions;
export default RegisterSlice.reducer;