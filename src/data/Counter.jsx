/* eslint-disable react/prop-types */
import {
	createContext,
	useContext,
	useState,
} from "react/cjs/react.production.min";

import Counter from "./Counter";
import "./styles.css";

function App2() {
	return (
		<div>
			<h1>Compound Component Pattern</h1>
			{/* POPULATION EXPLOSTION */}
			{/* <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      /> */}

			<Counter>
				<Counter.Label>
					My super flexible counter
				</Counter.Label>
				<Counter.Decrease icon="-" />
				<Counter.Count />
				<Counter.Increase icon="+" />
			</Counter>
		</div>
	);
}

// 1. CREATE A CONTEXT
const CounterContext = createContext();

// 2. CREATE A PARENT COMPONENT
function Counter({ children }) {
	const [count, setCount] = useState(0);

	const increase = () => {
		setCount((c) => c + 1);
	};

	const decrease = () => {
		setCount((c) => c - 1);
	};

	return (
		<CounterContext.Provider
			value={{ count, increase, decrease }}>
			<span>{children}</span>
		</CounterContext.Provider>
	);
}

// 3. CREATE CHILD COMPONENTS
function Count() {
	const { count } = useContext(CounterContext);
	return <span>{count}</span>;
}

function Label({ children }) {
	return <span>{children}</span>;
}

function Increase({ icon }) {
	const { increase } = useContext(CounterContext);

	return <button onClick={increase}>{icon}</button>;
}

function Decrease({ icon }) {
	const { decrease } = useContext(CounterContext);

	<button onClick={decrease}>{icon}</button>;
}

// 4. ADD CHILD COMP AS PROPERTIES AS TO PARENT COMPONENTS
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
