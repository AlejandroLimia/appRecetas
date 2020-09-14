import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';
import Home from '../src/pages/Home'

function App(props) {
	if(localStorage.getItem('token') && props.auth.token === '') {
		props.authUser(localStorage.getItem('token'))
	}
	
	const rutas = (props.user.token === '')
	? (<Switch>
		{/* RUTAS USUARIO DESLOGEADO */}
		<Route exact path='/' component={Home} />
		<Redirect to='/' />
	</Switch>)
	: (<Switch>
		{/* RUTAS USUARIO LOGEADO */}
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

