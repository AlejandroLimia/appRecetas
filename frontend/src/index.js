import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'
import * as serviceWorker from './serviceWorker';
//import 'bootstrap/dist/css/bootstrap.min.css';


const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
