const allowedOrigins =
	process.env.NODE_ENV === "production"
		? [process.env.CLIENT_URI_PROD]
		: [process.env.CLIENT_URI_DEV, process.env.CLIENT_URI_PROD];

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

export default corsOptions;
