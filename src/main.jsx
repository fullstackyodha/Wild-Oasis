import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./styles/GlobalStyles.js";

// const router = createBrowserRouter([
// 	{
// 		// element: <AppLayout />,
// 		children: [
// 			{
// 				path: "/",
// 				element: <Navigate to="/dashboard" replace />,
// 			},
// 			{
// 				path: "/dashboard",
// 				element: <Dashboard />,
// 			},
// 			{
// 				path: "/bookings",
// 				element: <Bookings />,
// 			},
// 			{
// 				path: "/cabins",
// 				element: <Cabins />,
// 			},
// 			{
// 				path: "/users",
// 				element: <Users />,
// 			},
// 			{
// 				path: "/settings",
// 				element: <Settings />,
// 			},
// 			{
// 				path: "/account",
// 				element: <Account />,
// 			},
// 		],
// 	},
// 	{
// 		path: "/login",
// 		element: <Login />,
// 	},
// 	{
// 		path: "*",
// 		element: <PageNotFound />,
// 	},
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{/* <RouterProvider router={router} /> */}

		{/* GLOBAL CSS STYLES */}
		<GlobalStyles />
		<App />
	</React.StrictMode>
);
