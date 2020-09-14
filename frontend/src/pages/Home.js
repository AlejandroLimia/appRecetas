import React from 'react';
import Header from "../components/Header"
import {connect} from 'react-redux'
import Footer from '../components/Footer';


const Home = (props) => {
    return (
        <>
       <Header/>
       <Footer/>
       </>
    )
}

const mapStateToProps = state => {
  return{

  }
}

export default connect(mapStateToProps) (Home)