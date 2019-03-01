import React, { ReactNode } from 'react';

type Props = {
  children: (object: any) => ReactNode;
};

class Sortable extends React.Component<Props> {
  sortAlphabetically = (items: string[]) => {
    return items.sort((a: string, b: string) => {
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
