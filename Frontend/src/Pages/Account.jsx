import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
	AvatarContainer,
	AvatarPreview,
	ButtonsContainer,
	EditButton,
	ErrorMessage,
	InfoSection,
	InfoText,
	InfoTitle,
	PageContainer,
	RecipeCard,
	RecipeTitle,
	TextInput,
	Title,
} from "../Styles/Account";

import { clearUser, deleteFavorite, updateUser } from "../Redux/userSlice";

const Account = () => {
	const currentUser = useSelector((state) => state.user);
	const savedRecipes = currentUser.savedRecipes;
	const defaultUser = {
		name: currentUser.name,
		email: currentUser.email,
	};

	const [user, setUser] = useState(defaultUser);
	const [avatar, setAvatar] = useState(currentUser.avatar);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const dispatch = useDispatch();

	// Handle avatar upload
	const handleAvatarUpload = async (event) => {
		const selectedImage = event.target.files[0];

		if (selectedImage) {
			const imageUrl = URL.createObjectURL(selectedImage);
			setIsEditing(true);
			// Set the selected image URL in the state
			setAvatar(imageUrl);
		} else {
			setError("Image upload error, please try again.");
		}
	};

	const handleEdit = async () => {
		if (!isEditing) {
			setIsEditing(true);
			return;
		}
	};
	const handleEditCancel = async () => {
		if (isEditing) {
			setUser(defaultUser);
			setAvatar(currentUser.avatar);
			setIsEditing(false);
			return;
		}
	};

	// Handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsEditing(false);
		const formData = new FormData();

		// Append user data to formData
		formData.append("name", user.name);
		formData.append("email", user.email);

		// Append the compressed avatar image if available
		if (avatar) {
			formData.append("avatar", avatar);
		}

		try {
			const response = await fetch(
				`http://localhost:5050/api/v1/user/avatar_upload/${currentUser._id}`,
				{
					method: "PUT",
					body: formData,
				}
			);

			if (response.status === 200) {
				const updatedUser = await response.json();
				dispatch(updateUser(updatedUser));
				setAvatar(updatedUser.avatar);
				setIsEditing(false);
				alert("User information updated successfully.");
			} else {
				console.error("Error updating user information:", response.statusText);
				setIsEditing(false);
				alert("Error updating user information. Please try again later.");
			}
		} catch (err) {
			console.error(err);
			setIsEditing(false);
			alert("Error updating user information. Please try again later.");
		}
	};

	const handleInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleUserDelete = async () => {
		try {
			const response = await fetch(
				`http://localhost:5050/api/v1/users/${currentUser._id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				dispatch(clearUser());
				alert("Account deleted successfully.");
				setTimeout(() => {
					window.location.href = "/";
				}, 2000);
			}

			alert("Error deleting account. Please try again later.");
		} catch (err) {
			console.error(err);
			setError("Error deleting user account. Please try again later.");
		}
	};

	const handleDeleteFav = (recipe) => {
		dispatch(deleteFavorite(recipe.name));
	};

	return (
		<PageContainer>
			<Navbar />

			<Title>Account Overview</Title>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<InfoSection>
				<InfoTitle>Personal Information</InfoTitle>
				{isEditing ? (
					<div>
						<AvatarContainer>
							<AvatarPreview
								src={
									avatar ||
									"https://res.cloudinary.com/client-images/image/upload/v1694458634/profile_pic_placeholder_nh4oxn.jpg"
								}
							/>
							<EditButton>
								<input
									style={{ maxWidth: "170px" }}
									type="file"
									name="avatar"
									accept="image/*"
									onChange={handleAvatarUpload}
								/>
							</EditButton>
						</AvatarContainer>
						<InfoText>
							Username:{" "}
							<TextInput
								name="name"
								value={user.name}
								onChange={handleInputChange}
							/>
						</InfoText>
						<InfoText>
							Email:{" "}
							<TextInput
								name="email"
								value={user.email}
								onChange={handleInputChange}
							/>
						</InfoText>
					</div>
				) : (
					<div>
						<AvatarContainer>
							<AvatarPreview src={currentUser.avatar} />
							<EditButton>
								<input
									style={{ maxWidth: "170px" }}
									type="file"
									accept="image/*"
									name="avatar"
									onChange={handleAvatarUpload}
								/>
							</EditButton>
						</AvatarContainer>
						<InfoText>Username: {currentUser.name}</InfoText>
						<InfoText>Email: {currentUser.email}</InfoText>
					</div>
				)}
				<ButtonsContainer>
					<EditButton onClick={isEditing ? handleSubmit : handleEdit}>
						{isEditing ? "Save" : "Edit"}
					</EditButton>
					{isEditing && (
						<EditButton
							style={{ backgroundColor: "red" }}
							onClick={handleEditCancel}
						>
							Cancel
						</EditButton>
					)}
					<EditButton
						style={{ backgroundColor: "red" }}
						onClick={handleUserDelete}
					>
						Delete Account
					</EditButton>
				</ButtonsContainer>
			</InfoSection>
			<InfoSection>
				<InfoTitle>Recipe History</InfoTitle>
				{savedRecipes.map((recipe) => (
					<RecipeCard key={recipe._id} recipe={recipe}>
						<RecipeTitle>{recipe.name}</RecipeTitle>
						<EditButton
							style={{
								position: "absolute",
								top: 0,
								right: 0,
								width: "100px",
								backgroundColor: "red",
								marginRight: "20px",
							}}
							onClick={() => handleDeleteFav(recipe.name)}
						>
							Delete
						</EditButton>
					</RecipeCard>
				))}
			</InfoSection>
		</PageContainer>
	);
};

export default Account;
