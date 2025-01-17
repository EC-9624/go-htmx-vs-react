// eslint-disable-next-line react/prop-types
export default function ComponentUpdate({ count, setCount }) {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Out of Bound Updates
          </h1>
          <p className="text-gray-500 text-md">
            Example of how React handles Out of Bound Updates
          </p>
        </div>
      </header>
      <main>
        <div>
          <Content count={count} setCount={setCount} />
        </div>
      </main>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function Content({ count, setCount }) {
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1); // Increment the count
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1); // Decrement the count
  };

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <h1 id="counter">Count = {count}</h1>
      <button
        onClick={handleIncrement}
        className="bg-blue-500 text-white font-semibold py-2 px-2 rounded-md hover:bg-blue-600"
      >
        Add Count
      </button>
      <button
        onClick={handleDecrement}
        className="bg-red-500 text-white font-semibold py-2 px-2 rounded-md hover:bg-red-600"
      >
        Remove Count
      </button>
    </div>
  );
}
