import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import './style.css'

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5)
  const [sessionLength, setSessionLength] = React.useState(25)
  const [play, setPlay] = React.useState(false)
  const [title, setTitle] = React.useState('Session')
  const [timeLeft, setTimeLeft] = React.useState(1500)

  const timeout = setTimeout(() => {
    if(timeLeft && play){
      setTimeLeft(timeLeft - 1)
    }
  }, 1000)

  const handleBreakDecrement = () => {
    if(breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  }
  const handleBreakIncrement = () => {
    if(breakLength < 60) {
      setBreakLength(breakLength + 1)
    }
  }

  const handleSessionDecrement = () => {
    if(sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 60)
    }
  }
  const handleSessionIncrement = () => {
    if(sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 60)
    }
  }
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft/60)
    const seconds = timeLeft - minutes * 60
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
    return `${formattedMinutes}:${formattedSeconds}`
  }

  const handleStartStop = () => {
    clearTimeout(timeout)
    setPlay(!play)
  }
    const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTitle("Session");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }

  const resetTimer = () => {
    const audio = document.getElementById('beep')
    if(!timeLeft && title === 'Session'){
      setTimeLeft(breakLength * 60)
      setTitle('Break')
      audio.play()
    }
    if(!timeLeft && title === 'Break'){
      setTimeLeft(sessionLength * 60)
      setTitle('Session')
      audio.pause()
      audio.currentTime = 0
    }
  }
  const clock = () => {
    if(play){
      resetTimer()
      // timeout
    }else {
      clearTimeout(timeout)
    }
  }
  
  React.useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])
 


  return (
    <>
      <div id="wrapper">
        <div className="break-session-container">
          <div className="break">
            <h3 id="break-label">Break length</h3>
            <div className="break-controls">
              <button disabled={play} id="break-decrement" onClick={handleBreakDecrement} >&#8595;</button>
              <div id="break-length">{breakLength}</div>  
              <button disabled={play} id="break-increment" onClick={handleBreakIncrement}>&#8593;</button>
            </div>
          </div>

          <div className="session">
            <h3 id="session-label">Session length</h3>
            <div className="session-controls">
              <button disabled={play} id="session-decrement" onClick={handleSessionDecrement}>&#8595;</button>
              <div id="session-length">{sessionLength}</div>
              <button disabled={play} id="session-increment" onClick={handleSessionIncrement}>&#8593;</button> 
            </div>
          </div>

        </div>
        <div className="timer-container">
          <div id="timer-label">{title}</div>
          <div id="time-left">{timeFormatter()}</div>
          <div className="timer-controls">
            <button id="start_stop" onClick={handleStartStop}>Start/Stop</button>
            <button id="reset" onClick={handleReset}>Reset</button>
          </div>
        </div>

      </div>
        <audio
          id="beep" 
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
    </>
  )
};

ReactDOM.render(<App />, document.getElementById("app"))