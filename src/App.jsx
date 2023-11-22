import {
	BrowserRouter,
	Navigate,
	Routes,
	Route,
} from "react-router-dom";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";

// REACT QUERY CLIENT
const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
	return (
		<>
			{/* REACT QUERY CLIENT PROVIDER */}
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />;
				<BrowserRouter>
					<Routes>
						<Route element={<AppLayout />}>
							{/* CHILD ROUTES */}
							<Route
								index
								element={
									<Navigate replace to="dashboard" />
								}
							/>
							{/* Declares an element that should be rendered at a certain URL path. */}
							<Route
								path="dashboard"
								element={<Dashboard />}
							/>
							<Route
								path="bookings"
								element={<Bookings />}
							/>
							<Route path="cabins" element={<Cabins />} />
							<Route path="users" element={<Users />} />
							<Route
								path="settings"
								element={<Settings />}
							/>
							<Route path="account" element={<Account />} />
						</Route>

						<Route path="login" element={<Login />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				{/* React HOT Toaster */}
				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: { duration: 3 * 1000 },
						error: { duration: 5 * 1000 },
						style: {
							fontSize: "15px",
							maxWidth: "500px",
							padding: "16px 24px",
							backgroundColor: "var(--color-grey-0)",
							color: "var(--color-grey-700)",
						},
					}}
				/>
			</QueryClientProvider>
		</>
	);
}

export default App;
