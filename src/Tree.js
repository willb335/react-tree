import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Tree extends Component {
  static defaultProps = { sort: null };

  renderItems = (items, parent) => {
    const { sort, handleItemClick } = this.props;
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
                  handleItemClick({
                    items,
                    item,
                    collapsed: items[item].collapsed
                  })
                }
                onKeyPress={() =>
                  handleItemClick({
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

  render() {
    const { items } = this.props;

    return this.renderItems(items, null);
  }
}

export default Tree;
