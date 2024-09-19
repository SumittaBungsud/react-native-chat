import React from 'react';
import renderer from 'react-test-renderer';
import Intro from '../Intro';
import RootNavigator from '../components/RootNavigator';
import { screen, render } from '@testing-library/react-native';


describe('UI testing', () => {
  test('renders Intro correctly', () => {
    const tree = renderer.create(<Intro />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('shows Login screen when starting', () => {
    render(<RootNavigator />);

    expect(screen.getByText('Don\'t have an account?')).toBeOnTheScreen();
  });

});
