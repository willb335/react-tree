import React from 'react';
import PropTypes from 'prop-types';

class Sortable extends React.Component {
  static propTypes = { children: PropTypes.func.isRequired };

  sortAlphabetically = items => {
    return items.sort((a, b) => {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;

      return 0;
    });
  };

  render() {
    const { children } = this.props;
    const sortOptions = { alphabetically: this.sortAlphabetically };

    return children(sortOptions);
  }
}
export default Sortable;
