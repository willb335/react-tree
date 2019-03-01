import React from 'react';
import Tree from './Tree';
import Sortable from './Sortable';
import Collapsible from './Collapsible';
import library from './treeData';

function App() {
  return (
    <Collapsible>
      {({ collapse }) => (
        <Sortable>
          {({ alphabetically }) => (
            <Tree collapse={collapse} items={library} sort={alphabetically} />
          )}
        </Sortable>
      )}
    </Collapsible>
  );
}

export default App;
