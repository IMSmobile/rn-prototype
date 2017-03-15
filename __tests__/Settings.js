import 'react-native';
import React from 'react';
import Settings from '../src/Settings.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Settings />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
