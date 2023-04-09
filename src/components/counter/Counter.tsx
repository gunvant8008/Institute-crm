import React, { useState } from "react";

export interface CounterProps {
  description: string;
  defaultCount: number;
}

const Counter = ({ description, defaultCount }: CounterProps) => {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl">
        DESC: {description} - DC: {defaultCount}
      </h2>
      <label>
        Incrementor:
        <input
          className="text-black"
          value={incrementor}
          onChange={(evt) => {
            setIncrementor(parseInt(evt.target.value) || 1);
          }}
          type="number"
        />
      </label>
      <div className="flex space-x-4">
        <button
          aria-label="decrement from counter"
          className="w-10 bg-teal-800"
          onClick={() => setCount(count - incrementor)}
        >
          -
        </button>
        <h3>Current Count: {count}</h3>
        <button
          aria-label="increment in counter"
          className="w-10 bg-teal-800"
          onClick={() => setTimeout(() => setCount(count + incrementor), 200)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
