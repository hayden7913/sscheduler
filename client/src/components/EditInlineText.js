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
    console.log('helo')
    handleChange(cardId, data.message);
  }

  customValidateText(text) {
    return true;
  }

  handleClick = (evt) =>  {
    const { onClick } = this.props;
    evt.stopPropagation();
    console.log('inner function called');
    onClick();
  }

  render() {
    const { className, text } = this.props;

    return (
      <div
      >
        <InlineEdit
          activeClassName="editing"
          change={this.dataChanged}
          className={className}
          paramName="message"
          text={text || ''}
          validate={this.customValidateText}
        />
      </div>
    );
  }
}

EditInlineText.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  text: PropTypes.string,
};
