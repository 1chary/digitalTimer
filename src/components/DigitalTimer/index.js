// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isStarted: false,
    timeElapsedInMinutes: 25,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  time = () => {
    const {timeElapsedInSeconds, timeElapsedInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeElapsedInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isStarted: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  pauseOrStart = () => {
    const {isStarted, timeElapsedInSeconds, timeElapsedInMinutes} = this.state

    const isTimerCompleted = timeElapsedInSeconds === timeElapsedInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isStarted) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.time, 1000)
    }

    this.setState(prevState => ({isStarted: !prevState.isStarted}))
  }

  increaseCount = () => {
    this.setState(prevState => ({
      timeElapsedInMinutes: prevState.timeElapsedInMinutes + 1,
    }))
  }

  decreaseCount = () => {
    const {timeElapsedInMinutes} = this.state

    if (timeElapsedInMinutes > 1) {
      this.setState(prevState => ({
        timeElapsedInMinutes: prevState.timeElapsedInMinutes - 1,
      }))
    }
  }

  resetTimer = () => {
    this.clearTimeInterval()
    this.setState({timeElapsedInSeconds: 0})
  }

  getTimeInTheGivenFormat = () => {
    const {timeElapsedInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingTime = timeElapsedInMinutes * 60 - timeElapsedInSeconds
    const timeInSecondsString = Math.floor(totalRemainingTime % 60)
    const timeInMinutesString = Math.floor(totalRemainingTime / 60)
    const minutes =
      timeInMinutesString > 9 ? timeInMinutesString : `0${timeInMinutesString}`
    const seconds =
      timeInSecondsString > 9 ? timeInSecondsString : `0${timeInSecondsString}`

    return `${minutes}: ${seconds}`
  }

  render() {
    const {isStarted, timeElapsedInMinutes, timeElapsedInSeconds} = this.state
    return (
      <div className="appContainer">
        <h1 className="headingText">Digital Timer</h1>
        <div className="timerContainer">
          <div className="background">
            <div className="time">
              <h1>{this.getTimeInTheGivenFormat()}</h1>
              <p>{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="controlsContainer">
            <div className="startAndResetContainer">
              <div className="start">
                <button
                  className="playButton"
                  type="button"
                  onClick={this.pauseOrStart}
                >
                  <img
                    src={
                      isStarted
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isStarted ? 'pause icon' : 'play icon'}
                    className="playImage"
                  />{' '}
                  {isStarted ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="start">
                <button
                  className="playButton"
                  type="button"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="playImage"
                  />{' '}
                  Reset
                </button>
              </div>
            </div>
            <p className="setTimerPara">Set Timer Limit</p>
            <div className="plusAndMinusContainer">
              <button
                className="minusButton"
                type="button"
                onClick={this.decreaseCount}
              >
                -
              </button>
              <div className="numberContainer">
                <p>{timeElapsedInMinutes}</p>
              </div>
              <button
                className="minusButton"
                type="button"
                onClick={this.increaseCount}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
