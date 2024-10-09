import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
//asynchronous aperations
export const add_friend_seller = createAsyncThunk(
    'chat/add_friend_seller',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(obj);
            const { data } = await api.post(`/chat/customer/add-friend-seller`, obj, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const send_message = createAsyncThunk(
    'chat/send_message',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(obj);
            const { data } = await api.post(`/chat/customer/send-message-to-seller`, obj, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const chatReducer = createSlice({
    name: 'chat',
    initialState: {
        chatLoader: false,
        chatSuccessMessage: '',
        chatErrorMessage: '',
        myFriends: [],
        friendMessages: [],
        currentFriend: ''



    },
    reducers: {
        chatMessageClear: (state, _) => {
            state.chatErrorMessage = '';
            state.chatSuccessMessage = '';
        },
        addNewMessage: (state, {payload}) => {
            state.friendMessages = [...state.friendMessages, payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_friend_seller.pending, (state, { payload }) => {
                state.chatLoader = true;
            }).addCase(add_friend_seller.rejected, (state, { payload }) => {
                state.chatLoader = false;
            }).addCase(add_friend_seller.fulfilled, (state, { payload }) => {
                state.chatLoader = false;
                state.myFriends = payload.myFriends;
                state.friendMessages = payload.messages;
                state.currentFriend = payload.currentFriend;
            })
            .addCase(send_message.fulfilled, (state, { payload }) => {                
                state.myFriends = payload.myFriends;
                state.friendMessages = [...state.friendMessages, payload.message];
                state.chatSuccessMessage = 'Message sended successfully'
            })

    }
});
export const { chatMessageClear, addNewMessage } = chatReducer.actions;
export default chatReducer.reducer;