export const BASE_URL =
	process.env.REACT_APP_NODE_ENV === "production"
		? process.env.REACT_APP_SERVER_URI_PROD
		: process.env.REACT_APP_SERVER_URI_DEV || "http://localhost:5050";
