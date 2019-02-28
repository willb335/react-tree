import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  render() {
    const { children } = this.props;
    return children({ collapse: true });
  }
}
export default Collapsible;
