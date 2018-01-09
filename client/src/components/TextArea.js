import React from 'react';
import shortId from 'shortid';

export default class NewCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frId: null,
      textValue: '',
    };
  }

  componentDidMount() {
    fetch('/fr')
      .then(res => res.json())
      .then(data => this.setState({
        textValue: data[0].featureRequests,
        frId: data[0]._id,
      }))
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      textValue: value
    });

    fetch(`/fr/${this.state.frId}`, {
      method: 'put',
      body: JSON.stringify({ featureRequests: value}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    const { hideTextArea } = this.props;

    return (
       <div>
         <textarea
          name="textValue"
          onChange={this.handleChange}
          placeholder="New Task"
          type="text"
          style={{ height: "100px" }}
          value={this.state.textValue}
        />
        <span onClick={ hideTextArea } style={{ cursor: "pointer", textDecoration: "underline"}}>Hide...</span>
       </div>
    );
  }
}
