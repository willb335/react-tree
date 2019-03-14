import React from 'react';
import Tree from './Tree';
import Sortable from './Sortable';
import library from './treeData';

function App() {
  return (
    <Sortable>
      {({ alphabetically }) => (
        <Tree collapse items={library} sort={alphabetically} />
      )}
    </Sortable>
  );
}

export default App;
