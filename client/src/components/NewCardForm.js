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
    if (prevProps.focusFormTrigger !== this.props.focusFormTrigger) {
      this.firstInput.focus()
    }

    if (prevProps.blurFormTrigger !== this.props.blurFormTrigger) {
      this.firstInput.blur()
    }
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
    const { addCard, newCardsToTop, saveCardState } = this.props;
    const { durationValue, textValue } = this.state;

    addCard({
      id: shortId.generate(),
      text: textValue,
      duration: durationValue === '' ? 0 :  parseInt(durationValue),
      isSelected: newCardsToTop,
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
    const { toggleIsFormFocused } = this.props;
    const inputStyle = {
      width: '175px',
      marginLeft: '10px',
    }

    return (
      <form onSubmit={this.handleSubmit}>
          <TextField
            name="textValue"
            onBlur={toggleIsFormFocused}
            onChange={this.handleChange}
            onFocus={toggleIsFormFocused}
            placeholder="New Task"
            ref={(input) => { this.firstInput = input; }}
            style={inputStyle}
            type="text"
            value={this.state.textValue}
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
