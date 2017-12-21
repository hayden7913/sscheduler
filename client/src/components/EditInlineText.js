import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline';


export default class EditInlineText extends Component {
  constructor() {
    super();

    this.state = {
      message: 'Click to Edit',
    };

    this.dataChanged = this.dataChanged;
  }

  dataChanged = (data) => {
    const { handleChange, cardId } = this.props;

    handleChange(cardId, data.message);
  }

  customValidateText(text) {


    return true;
  }

  render() {
    const { className, text } = this.props;

    return (
      <InlineEdit
        validate={this.customValidateText}
        className={className}
        activeClassName="editing"
        text={text || ''}
        paramName="message"
        change={this.dataChanged}
      />
    );
  }
}

EditInlineText.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  text: PropTypes.string,
};
