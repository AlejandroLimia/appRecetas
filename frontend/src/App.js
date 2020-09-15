import React from 'react';
import './styles/generalStyles.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';
import Home from '../src/pages/Home';
import SignUp from '../src/pages/SignUp';
import Login from '../src/pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from './components/Header';
import './styles/generalStyles.css'



function App(props) {
	if(localStorage.getItem('token') && props.auth.token === '') {
		props.authUser(localStorage.getItem('token'))
	}
	
	const rutas = (props.user.token === '')
	? (<Switch>
		{/* RUTAS USUARIO DESLOGEADO */}
		<Route exact path='/' component={Home} />
		<Route path='/signup' component={SignUp} />
		<Route path='/login' component={Login} />
		<Redirect to='/' />
	</Switch>)
	: (<Switch>
		<Route exact path="/" component={Home}/>
		{/* <Route exact path='/' component={} /> */}
		<Redirect to='/' />
	</Switch>);
	

	return (
		<>
			<BrowserRouter>
			 <Header/>
				{rutas}
				<Footer/>	
			</BrowserRouter>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
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

