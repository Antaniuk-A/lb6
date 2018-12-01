import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      pause: false,
      time: props.time,
      reminder: ""
    };
    this.interval = null;
  }

  startTimer() {
    if (this.state.pause || (this.state.time !== 0 && !this.state.status)) {
      this.setState({
        status: true,
        pause: false
      });
      this.interval = setInterval(() => {
        if (this.state.time === 0) {
          if (this.props.onEnd) this.endTimer();
          clearInterval(this.interval);
          return;
        }
        this.setState({ time: this.state.time - 1 });
      }, 1000);
    }
  }

  endTimer() {
    alert(this.state.reminder);
    this.props.onEnd();
    this.setState({
      status: false,
      time: this.props.time,
      reminder: ""
    });
  }

  stopTimer() {
    if (this.interval) clearInterval(this.interval);
    this.setState({
      status: false,
      pause: false,
      time: 0
    });
  }

  pauseTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.setState({
        status: false,
        pause: true
      });
    }
  }

  resetTimer() {
    if (this.interval) clearInterval(this.interval);
    this.setState({
      status: false,
      pause: false,
      time: this.props.time
    });
  }

  handleTime(e) {
    this.setState({ time: e.target.value });
  }

  handleReminder(e) {
    this.setState({ reminder: e.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="number"
          placeholder="Time"
          min="0"
          pattern="^\d+$"
          title="Invalid value, time can't be negative"
          onChange={e => this.handleTime(e)}
          value={this.state.time}
        />
        <input
          type="text"
          placeholder="Reminder"
          onChange={e => this.handleReminder(e)}
          value={this.state.reminder}
        />
        <button onClick={() => this.startTimer()}>Start</button>
        <button onClick={() => this.stopTimer()}>Stop</button>
        <button onClick={() => this.pauseTimer()}>Pause</button>
        <button onClick={() => this.resetTimer()}>Reset</button>
      </div>
    );
  }
}

export default Timer;
