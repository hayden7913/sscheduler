import React from 'react';
import shortId from 'shortid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class NewCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
      durationValue: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    const { addCard, saveCardState } = this.props;
    const { durationValue, textValue } = this.state;

    addCard({
      id: shortId.generate(),
      text: textValue,
      duration: durationValue === '' ? 0 :  parseInt(durationValue),
    });

    saveCardState();

    this.setState({
       textValue: '',
       durationValue: ''
    });

    this.firstInput.focus();
    event.preventDefault();
  }

  render() {
    const inputStyle = {
      width: '175px',
      marginLeft: '10px',
    }
    return (
      <form onSubmit={this.handleSubmit}>
          <TextField
            ref={(input) => { this.firstInput = input; }}
            type="text"
            name="textValue"
            value={this.state.textValue}
            placeholder="New Task"
            onChange={this.handleChange}
            style={inputStyle}
          />
          <TextField
            type="text"
            name="durationValue"
            value={this.state.durationValue}
            placeholder="Duration"
            onChange={this.handleChange}
            style={inputStyle}
          />
        <RaisedButton type="submit" label="Submit" style={{marginLeft: "10px", marginBottom: "10px"}}/>
      </form>
    );
  }
}
