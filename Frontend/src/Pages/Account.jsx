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
import { handleAccountUpdate, handleInputChange } from "../Utilities/account";
import {
	handleDeleteFav,
	handleAvatarUpload,
	handleEdit,
	handleEditCancel,
	handleUserDelete,
} from "../Utilities/buttons";

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
									onChange={(e) =>
										handleAvatarUpload(e, setIsEditing, setAvatar, setError)
									}
								/>
							</EditButton>
						</AvatarContainer>
						<InfoText>
							Username:{" "}
							<TextInput
								name="name"
								value={user.name}
								onChange={(e) => handleInputChange(e, setUser, user)}
							/>
						</InfoText>
						<InfoText>
							Email:{" "}
							<TextInput
								name="email"
								value={user.email}
								onChange={(e) => handleInputChange(e, setUser, user)}
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
									onChange={(e) =>
										handleAvatarUpload(e, setIsEditing, setAvatar, setError)
									}
								/>
							</EditButton>
						</AvatarContainer>
						<InfoText>Username: {currentUser.name}</InfoText>
						<InfoText>Email: {currentUser.email}</InfoText>
					</div>
				)}
				<ButtonsContainer>
					<EditButton
						onClick={
							isEditing
								? (e) =>
										handleAccountUpdate(
											e,
											setIsEditing,
											user,
											avatar,
											currentUser,
											dispatch,
											setAvatar
										)
								: () => handleEdit(isEditing, setIsEditing)
						}
					>
						{isEditing ? "Save" : "Edit"}
					</EditButton>
					{isEditing && (
						<EditButton
							style={{ backgroundColor: "red" }}
							onClick={() =>
								handleEditCancel(
									isEditing,
									setIsEditing,
									setUser,
									setAvatar,
									defaultUser,

									currentUser
								)
							}
						>
							Cancel
						</EditButton>
					)}
					<EditButton
						style={{ backgroundColor: "red" }}
						onClick={() => handleUserDelete(currentUser, dispatch, setError)}
					>
						Delete Account
					</EditButton>
				</ButtonsContainer>
			</InfoSection>
			<InfoSection>
				<InfoTitle>Recipe History</InfoTitle>
				{savedRecipes.length < 1 ? (
					<p>No Saved Recipes.</p>
				) : (
					savedRecipes.map((recipe) => (
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
								onClick={() => handleDeleteFav(recipe, dispatch)}
							>
								Delete
							</EditButton>
						</RecipeCard>
					))
				)}
			</InfoSection>
		</PageContainer>
	);
};

export default Account;
