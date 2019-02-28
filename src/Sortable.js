import React from 'react';

class Sortable extends React.Component {
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
