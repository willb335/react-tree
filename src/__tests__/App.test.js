import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Tree from '../Tree';
import Sortable from '../Sortable';
import Collapsible from '../Collapsible';
import library from '../treeData';

afterEach(cleanup);

test('loads and displays content', () => {
  const { getByText } = render(<Tree items={library} />);

  expect(getByText('Children of time')).toHaveTextContent('Children of time');
  expect(getByText('Commando')).toHaveTextContent('Commando');
  expect(getByText('Alien')).toHaveTextContent('Alien');
});

test('loads and displays collapsed content', () => {
  const { getByText, queryByText } = render(
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

  expect(getByText('Books')).toHaveTextContent('Books');
  expect(getByText('Movies')).toHaveTextContent('Movies');
  expect(queryByText('Action')).toBeNull();

  fireEvent(
    getByText('Movies'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  );

  expect(getByText('Action')).toHaveTextContent('Action');
  expect(queryByText('Commando')).toBeNull();

  fireEvent(
    getByText('Action'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  );

  expect(getByText('Commando')).toHaveTextContent('Commando');
});
