/* eslint-disable prefer-const */
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isStart: false,
    timerCount: 25,
    letSeconds: 0,
    letMinutes: 0,
    isRunning: true,
  }
  //   componentDidMount(){

  //   }

  startWatch = () => {
    let {isStart} = this.state
    this.setState(i => ({
      isStart: !i.isStart,
    }))
    if (isStart) {
      clearInterval(this.clearId)
    } else {
      this.clearId = setInterval(this.countdownWatch, 1000)
    }
  }

  restart = () => {
    clearInterval(this.clearId)
    this.setState({
      isStart: false,
      timerCount: 25,
      letSeconds: 0,
      letMinutes: 0,
      isRunning: true,
    })
  }

  countdownWatch = () => {
    const {timerCount, isStart, isRunning} = this.state
    let {letMinutes, letSeconds} = this.state

    if (isStart === true && isRunning === true) {
      letMinutes = timerCount
      this.setState({
        letMinutes: timerCount,
        isRunning: false,
      })
    }
    const totalMinutes = letMinutes * 60 + letSeconds
    const seconds = totalMinutes % 60
    if (letSeconds === 0) {
      this.setState({
        letSeconds: 59,
      })
    } else {
      this.setState(i => ({
        letSeconds: i.letSeconds - 1,
      }))
    }
    if (seconds === 0) {
      this.setState(i => ({
        letMinutes: i.letMinutes - 1,
      }))
    }
    if (letSeconds === 0 && letMinutes === 0) {
      clearInterval(this.clearId)
      this.setState({
        isStart: false,
        timerCount: 25,
        letMinutes: 25,
        letSeconds: 0,
      })
    }
  }

  decreaseTime = () => {
    const {timerCount, isStart} = this.state
    if (timerCount > 1 && isStart === false) {
      this.setState(i => ({
        timerCount: i.timerCount - 1,
      }))
    }
  }

  increaseTime = () => {
    const {isStart} = this.state
    if (isStart === false) {
      this.setState(i => ({
        timerCount: i.timerCount + 1,
      }))
    }
  }

  render() {
    const {isStart, timerCount, letMinutes, letSeconds} = this.state
    let realAns = ''
    if (letSeconds === 0) {
      realAns = `${timerCount}:0${letSeconds}`
    } else if (letSeconds.toString().length === 1) {
      realAns = `${letMinutes}:0${letSeconds}`
    } else {
      realAns = `${letMinutes}:${letSeconds}`
    }

    const changeStart = isStart ? 'Pause' : 'Start'
    const changePaused = isStart ? 'Running' : 'Paused'
    const changeStartPic = !isStart
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
    const changeStartPicAlt = !isStart ? 'play icon' : 'pause icon'
    return (
      <div className="bg-container">
        <div className="full-container">
          <h1>Digital Timer</h1>
          <div className="bottom-container">
            <div className="left-container">
              <div className="time-container">
                <h1 className="time-container-time">{realAns}</h1>
                <p className="time-container-condition">{changePaused}</p>
              </div>
            </div>
            <div className="right-container">
              <div className="button-main-container">
                <div className="btn-container">
                  <button
                    className="change-btn btn-container"
                    onClick={this.startWatch}
                    type="button"
                  >
                    <img
                      src={changeStartPic}
                      className="button-image-class"
                      alt={changeStartPicAlt}
                    />
                    <p className="command-content">{changeStart}</p>
                  </button>
                </div>
                <div className="btn-container">
                  <button
                    onClick={this.restart}
                    className="change-btn"
                    type="button"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      className="button-image-class"
                      alt="reset icon"
                    />
                  </button>
                  <p className="command-content">Reset</p>
                </div>
              </div>
              <p>Set Timer Limit</p>
              <div className="plus-minus-container">
                <button
                  type="button"
                  onClick={this.decreaseTime}
                  className="btn-plus-minus"
                >
                  -
                </button>
                <div className="time-change-container">
                  <p>{timerCount}</p>
                </div>
                <button
                  type="button"
                  onClick={this.increaseTime}
                  className="btn-plus-minus"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
