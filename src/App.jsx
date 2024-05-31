import * as React from "react";


export default function App() {
const [counter, setCounter] = React.useState(0);

const handleClick = () => setCounter(counter + 1);
return (
    <div>
        <h1> hello {counter}</h1>
        <button onClick={handleClick}>Add</button>
    </div>
)
}