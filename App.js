import React, { Component } from 'react';
import Routes from './routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './src/reducers';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(reduxThunk)
));


console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      signLoaded: false,
    }
  }

  componentDidMount() {
    this.setState({ signLoaded: true })
  }

  render() {
    const { signLoaded } = this.state;
    if (!signLoaded) {
      return null;
    }

    //const Layout = AppSwitchNavigator(signed);
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
