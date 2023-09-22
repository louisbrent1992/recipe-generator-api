const allowedOrigins =
	process.env.NODE_ENV === "production"
		? ["https://recipe-finder-app-v1.onrender.com"]
		: ["http://localhost:3000", "https://recipe-finder-app-v1.onrender.com"];

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			console.log("origin allowed");
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

export default corsOptions;
