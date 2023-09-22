export const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://recipe-finder-server-v1.onrender.com"
		: process.env.REACT_APP_DATABASE_URI || "http://localhost:5050";
