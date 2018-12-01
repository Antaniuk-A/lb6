import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      timeValue: this.props.time,
      reminder: ""
    };
    this.interval = null;
  }

  startTimer() {
    if (this.state.pause || this.state.timeValue) {
      this.setState({
        pause: false
      });
      this.interval = setInterval(() => {
        if (this.state.timeValue === 0) {
          if (this.props.onEnd) this.endTimer();
          clearInterval(this.interval);
          return;
        }
        this.setState({ timeValue: this.state.timeValue - 1 });
      }, 1000);
    }
  }

  endTimer() {
    alert(this.reminder);
    this.props.onEnd();
    this.setState({
      timeValue: this.props.time,
      reminder: ""
    });
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({
      pause: false,
      timeValue: ""
    });
  }

  pauseTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.setState({
        pause: true
      });
    }
  }

  resetTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.setState({
        pause: false,
        timeValue: this.props.time
      });
    }
  }

  handleTime(e) {
    this.setState({ timeValue: e.target.value });
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
          value={this.state.timeValue}
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
