import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, userLogin: { userInfo }, ...rest }) => (

    <Route
        {...rest}
        render={props => userInfo
            ?
            (<Component {...props} />)
            :
            (<Redirect to="/login" />)
        }
    />
)

const mapStateToProps = state => ({
    userLogin: state.userLogin
})

export default connect(mapStateToProps)(PrivateRoute)
