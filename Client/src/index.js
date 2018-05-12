import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { withRoot } from './utils';
import store from './store';

const target = document.querySelector('#root');

const StyledApp = withRoot(App)

render(
  <Provider store={store}>
    <div>
      <StyledApp />
    </div>
  </Provider>,
  target
);
