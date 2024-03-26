export const BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_DATABASE_URI_PROD
		: process.env.REACT_APP_DATABASE_URI || "http://localhost:5050";
