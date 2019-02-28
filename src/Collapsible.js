import React from 'react';

class Collapsible extends React.Component {
  state = {};

  componentDidMount() {
    const { items } = this.props;
    this.flattenItems(items, null);
  }

  flattenItems = (items, parent) => {
    items.forEach(({ text, children }) => {
      if (children && children.length) {
        this.setState(
          {
            [text]: {
              children: children.length,
              collapsed: true,
              parent
            }
          },
          () => this.flattenItems(children, text)
        );

        return;
      }
      this.setState({
        [text]: {
          children: 0,
          collapsed: false,
          parent
        }
      });
    });
  };

  handleItemClick = ({ item, collapsed }) => {
    this.setState(prevState => ({
      [item]: { ...prevState[item], collapsed: !collapsed }
    }));
  };

  render() {
    const { children } = this.props;
    console.log('state', this.state);

    return children({
      items: this.state,
      handleItemClick: this.handleItemClick
    });
  }
}
export default Collapsible;
