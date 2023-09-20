const allowedOrigins = [
	process.env.NODE_ENV === "production"
		? "https://recipe-finder-app-9b6z.onrender.com"
		: "http://localhost:3000",
];

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			console.log("origin allowed");
			callback(null, true);
		} else {
			console.log("origin not allowed");
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

export default corsOptions;
