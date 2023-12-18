import { useState } from 'react'
import reactLogo from './assets/react.svg'
import lyricBoostLogo from '/lyricBoostLogo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="/" target="_blank">
          <img src={lyricBoostLogo} className="logo" alt="Lyric Boost logo" />
        </a>
      </div>
      <h1>Lyric Boost</h1>
      <p className="read-the-docs"> 
        Blast through writer's block.
      </p>
    </>
  )
}

export default App
