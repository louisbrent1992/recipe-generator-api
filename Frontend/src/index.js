import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
	<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</GoogleOAuthProvider>
);
