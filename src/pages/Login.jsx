import styled from "styled-components";

const LoginLayout = styled.main`
	min-height: 100vh;
	background-color: var(--color-grey-50);

	display: grid;
	grid-template-columns: 48rem;
	align-content: center;
	justify-content: center;
	gap: 3.2rem;
`;

function Login() {
	return <LoginLayout>Login</LoginLayout>;
}

export default Login;
