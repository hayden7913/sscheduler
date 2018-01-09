import React from 'react';
import shortId from 'shortid';

export default class NewCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
    };
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.focusFormTrigger !== this.props.focusFormTrigger) {
  //
  //     // this.firstInput.focus()
  //   }
  // }


  handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    console.log(value)
    this.setState({
      textValue: value
    });
  }

  render() {

    return (
      <textarea
        name="textValue"
        onChange={this.handleChange}
        placeholder="New Task"
        type="text"
        value={this.state.textValue}
      />
    );
  }
}
