import React from 'react';

type Items = {
  children: any;
  text: string;
}[];

type FlattenedItem = {
  collapsed: boolean;
  parent: string;
  children: number | never;
};

type Flattened = {
  [key: string]: FlattenedItem;
};

type Props = {
  sort: (object: any) => [];
  collapse: boolean;
  items: Items;
};

type State = { [key: string]: FlattenedItem };

class Tree extends React.Component<Props, State> {
  static defaultProps = { sort: null, collapse: false };

  state: State = {};

  componentDidMount() {
    const { items } = this.props;

    this.flattenItems(items, null);
  }

  flattenItems = (items: Items, parent: string | null) => {
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
          } as Pick<State, keyof State>,
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
      } as Pick<State, keyof State>);
    });
  };

  renderItems = (items: Flattened, parent: string | null) => {
    const { sort } = this.props;
    const keys = Object.keys(items);
    let filteredItems = keys.filter(
      (key: string) => items[key].parent === parent
    );

    if (sort instanceof Function) {
      filteredItems = sort(filteredItems);
    }

    return (
      <ul>
        {filteredItems.map((item: string) => {
          const collapsed = items[item].collapsed;
          return (
            <li key={item}>
              <div
                className="folder"
                onClick={() => this.handleClick({ item, collapsed })}
                onKeyPress={() => this.handleClick({ item, collapsed })}
                role="button"
                tabIndex={0}
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

  handleClick = ({ item, collapsed }: { item: string; collapsed: boolean }) => {
    const { collapse } = this.props;
    collapse &&
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
