import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';
import { RUTA_API } from './constants';

function App(props) {
	if(localStorage.getItem('token') && props.auth.token === '') {
		props.authUser(localStorage.getItem('token'))
	}
	console.log(RUTA_API)
	const rutas = (props.user.token === '')
	? (<Switch>
		{/* <Route exact path='/' component={} /> */}
		<Redirect to='/' />
	</Switch>)
	: (<Switch>
		{/* <Route exact path='/' component={} /> */}
		<Redirect to='/' />
	</Switch>);

	return (
		<>
			<BrowserRouter>
				{rutas}
			</BrowserRouter>
		</>
  	);
}


const mapStateToProps = (state) => {
	return {
		user: state.userReducer
	}
}

const mapDispatchToProps = {
	authUser: userActions.authUser
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);

