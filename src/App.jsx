import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-amber-700 min-h-screen flex justify-center items-center rounded-3xl'>
      <h1 className='text-black text-4xl font-bold'>hello</h1>
    </div>
  );
}

export default App
