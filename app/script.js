import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      status: 'off',
      time: 0,
      timer: null
    };
  }

  step = () => {
    this.setState({
      time: this.state.time - 1
    });
    if (this.state.time === 0) {
      if (this.state.status === 'work'){
        this.setState({
          status: 'rest',
          time: 20
        })
        this.playBell()
      }
      else if (this.state.status === 'rest'){
        this.setState({
          status: 'work',
          time: 1200
        })
       this.playBell()
      }
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work',
    });
  };

  stopTimer = () => {
    this.setState({
      status: 'off',
      time: 0,
    })
    clearInterval(this.state.timer);
  }

  formatTime = (time) => {
    const minutes = Math.floor(time/60)
    let seconds = time-(minutes*60)

    seconds = ('0' + seconds).slice(-2)

    return `${minutes}:${seconds}`
  };

  closeApp = () => window.close();

  playBell = () => {
    var audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  }

  render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') &&
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
        }
        {(status === 'work') && <img src="./images/Work.png" /> }
        {(status === 'rest') && <img src="./images/Rest.png" /> }
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off')  && <button className="btn" onClick={(e)=>this.startTimer(e)}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={(e)=>this.stopTimer(e)}>Stop</button>}
        <button className="btn btn-close" onClick={(e)=>this.closeApp(e)}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
