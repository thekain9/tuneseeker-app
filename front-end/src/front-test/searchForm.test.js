// Importing necessary React library.
import React from 'react';

// Importing functions from the testing library: 'render' to render React components,
// and 'fireEvent' to simulate various DOM events on elements.
import { render, fireEvent } from '@testing-library/react';

// Importing the BrowserRouter from 'react-router-dom' and renaming it as 'Router'.
// This provides routing capabilities for React applications.
import { BrowserRouter as Router } from 'react-router-dom';

// Importing the SearchForm component from its location to be tested.
import SearchForm from '../components/SearchForm';

// Snapshot test:
// This test will check if the rendered output of the SearchForm component matches
// a previously stored snapshot. If there's a difference, the test will fail.
// It helps ensure that unintentional UI changes aren't introduced.
test('SearchForm snapshot', () => {
  // Rendering the SearchForm component within a Router because it uses 
  // routing-specific hooks. The 'asFragment' function captures the output.
  const { asFragment } = render(
    <Router>
      <SearchForm />
    </Router>
  );
  
  // This assertion checks if the current rendered output matches a saved snapshot.
  expect(asFragment()).toMatchSnapshot();
});

// Unit test:
// This test simulates user interaction by changing the value of an input field 
// and then checks if the new value was correctly set.
test('changes input value', () => {
  // Render the SearchForm component to access its elements.
  const { getByPlaceholderText } = render(
    <Router>
      <SearchForm />
    </Router>
  );

  // Accessing the input element using its placeholder text.
  const input = getByPlaceholderText('Search content');

  // Simulating a change event on the input element, setting its value to 'test'.
  fireEvent.change(input, { target: { value: 'test' } });
  
  // Assertion to check if the input's value was correctly set to 'test'.
  expect(input.value).toBe('test');
});

