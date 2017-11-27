import React from 'react';

export default class NewCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const { addCard } = this.props;
    const { value } = this.state;

    event.preventDefault();
    addCard({
      id: 4,
      text: value,
      duration: 0,
    });
    this.setState({ value: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            value={this.state.value}
            placeholder="New Task"
            onChange={this.handleChange}
          />
        </label>
      </form>
    );
  }
}
