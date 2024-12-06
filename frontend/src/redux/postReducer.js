

import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
	name: 'postReducer',
	initialState: {
		postData: [],
	},
	reducers: {
		// create,update and delete redux state and save data coming from database
		createPost: (state, action) => {
			state.postData = action.payload;
		},
		updatePost: (state, action) => {
			const postId = action.payload.postId;
			const { location, description } = action.payload;
			state.postData.map((post) => {
				if (post._id === postId) {
					post.location = location;
					post.description = description;
				}
				return post;
			});
		},
		deletePost: (state, action) => {
			state.postData = state.postData.filter(
				({ postId }) => postId !== action.payload.postId
			);
		},
	},
});

export const { createPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
