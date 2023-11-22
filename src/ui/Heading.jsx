import styled, { css } from "styled-components";

const Heading = styled.h1`
	${(props) =>
		props.as === "h1" &&
		css`
			font-size: 30px;
			font-weight: 800;
		`}

	${(props) =>
		props.as === "h2" &&
		css`
			font-size: 30px;
			font-weight: 800;
		`}

    ${(props) =>
		props.as === "h3" &&
		css`
			font-size: 30px;
			font-weight: 800;
		`}
`;

export default Heading;
