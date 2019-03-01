import React, { ReactNode } from 'react';

type Props = {
  children: (object: any) => ReactNode;
};

class Collapsible extends React.Component<Props> {
  render() {
    const { children } = this.props;
    return children({ collapse: true });
  }
}
export default Collapsible;
