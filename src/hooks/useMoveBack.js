import { useNavigate } from "react-router-dom";

export function useMoveBack() {
	// Returns an imperative method for changing the location
	const navigate = useNavigate();
	return () => navigate(-1);
}
