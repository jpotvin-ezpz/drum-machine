import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Bang some drums!',
    }
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
  }

  handleDisplayChange(id) {
    this.setState({display: id})
  }

  render()  {
    return (
      <div id='drum-machine'>
        <DrumPads bank={bankOne} onDisplayChange={this.handleDisplayChange}/>
        <Controls display={this.state.display}/>
      </div>
    )
  }
}


class DrumPads extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleClick(e) {
    if(e.target.className !== 'drum-pad') return;
    const audio = document.getElementById(e.target.innerText)
    audio.play();
    this.props.onDisplayChange(e.target.id)
  }

  handleKeyPress(e) {
    if (!(e.key.match(/([qweasdzxc])/gi))) return;
    const audio = document.getElementById(e.key.toUpperCase());
    audio.play();
    this.props.onDisplayChange(audio.parentElement.id)
  }

  render() {
  const drums = this.props.bank.map(drum => {
    return (
    <div className='drum-pad' id={drum.id} key={drum.keyCode}>
      {drum.keyTrigger}
      <audio class='clip' src={drum.url} id={drum.keyTrigger}/>
    </div>
    )
  })

  return (
    <div className='drums' onClick={this.handleClick}>
      {drums}
    </div>
  )
}
}

function Controls(props) {
  return (
    <div className='controls'>
      <Display display={props.display}/>
    </div>
  )
}

function Display(props) {
  return (
    <div id="display">{props.display}</div>
  )
}

ReactDOM.render(
  <DrumMachine />,document.getElementById('root'))