import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tree extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        children: PropTypes.array
      })
    ).isRequired,
    sort: PropTypes.func,
    collapse: PropTypes.bool
  };

  static defaultProps = { sort: null, collapse: false };

  state = {};

  componentDidMount() {
    const { items } = this.props;

    this.flattenItems(items, null);
  }

  flattenItems = (items, parent) => {
    const { collapse } = this.props;
    items.forEach(({ text, children }) => {
      if (children && children.length) {
        this.setState(
          {
            [text]: {
              children: children.length,
              collapsed: collapse,
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
          collapsed: collapse,
          parent
        }
      });
    });
  };

  renderItems = (items, parent) => {
    const { sort, collapse } = this.props;
    const keys = Object.keys(items);
    let filteredItems = keys.filter(key => items[key].parent === parent);

    if (sort instanceof Function) {
      filteredItems = sort(filteredItems);
    }

    return (
      <ul>
        {filteredItems.map(item => {
          return (
            <li key={item}>
              <div
                onClick={() =>
                  collapse &&
                  this.handleClick({
                    items,
                    item,
                    collapsed: items[item].collapsed
                  })
                }
                onKeyPress={() =>
                  collapse &&
                  this.handleClick({
                    items,
                    item,
                    collapsed: items[item].collapsed
                  })
                }
                role="button"
                tabIndex="0"
              >
                {item}
              </div>
              {items[item].children > 0 &&
                !items[item].collapsed &&
                this.renderItems(items, item)}
            </li>
          );
        })}
      </ul>
    );
  };

  handleClick = ({ item, collapsed }) => {
    this.setState(prevState => ({
      [item]: { ...prevState[item], collapsed: !collapsed }
    }));
  };

  render() {
    const { items } = this.props;

    return items ? this.renderItems(this.state, null) : null;
  }
}

export default Tree;
