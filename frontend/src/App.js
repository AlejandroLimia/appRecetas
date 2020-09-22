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
import './styles/generalStyles.css'
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Recipes from './pages/Recipes';
import RecipeFull from './pages/RecipeFull';
import CreateRecipe from './pages/CreateRecipe';



function App(props) {
	if(localStorage.getItem('token') && props.user.token === '') {
		props.authUser(localStorage.getItem('token'))
	}
	const rutas = (props.user.token === '')
	? (<Switch>
		{/* RUTAS USUARIO DESLOGUEADO */}
		<Route exact path='/' component={Home} />
		<Route path='/signup' component={SignUp} />
		<Route path='/login' component={Login} />
		<Route path='/profile/:username' component={Profile} />
		<Route path='/recipes/:diet' component={Recipes} />
		<Route path='/recipe/:id' component={RecipeFull} />
		<Redirect to='/' />
	</Switch>)
	: (<Switch>
		{/* RUTAS USUARIO LOGUEADO */}
		<Route exact path="/" component={Home}/>
		<Route path='/profile/:username' component={Profile} />
		<Route path='/recipes/:diet' component={Recipes} />
		<Route path='/recipe/:id' component={RecipeFull} />
		<Route path='/editProfile' component={EditProfile} />
		<Route path='/createRecipe' component={CreateRecipe} />
		<Redirect to='/' />
	</Switch>);
	

	return (
		<>
			<BrowserRouter>
				{rutas}	
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

