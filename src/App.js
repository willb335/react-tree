import React from 'react';
import Tree from './Tree';
import Sortable from './Sortable';
import Collapsible from './Collapsible';
import library from './treeData';

function App() {
  return (
    <Collapsible items={library}>
      {({ items, handleItemClick }) => (
        <Sortable>
          {({ alphabetically }) => (
            <Tree
              items={items}
              sort={alphabetically}
              handleItemClick={handleItemClick}
            />
          )}
        </Sortable>
      )}
    </Collapsible>
  );
}

export default App;
