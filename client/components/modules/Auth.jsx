import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateToken} from '../../actions/actions'
export default function (ComposedComponent) {
    class Auth extends Component {
        componentWillMount() {
            const authData = localStorage.getItem('authData');
            // var cookieString = documents.cookie;
            // var cookieName = 'token'
            // let cookie = '';
            // var start = cookieString.indexOf('token=');
            // if (start == -1) // 找不到
            //     cookie='';
            // start += cookieName.length + 1;
            // var end = cookieString.indexOf(';', start);
            // if (end == -1) cookie=  cookieString.substring(start);
            // cookie =  cookieString.substring(start, end);
            if (!authData) {
                this.props.history.push('/login');
            }
            this.props.dispatch(updateToken(authData));
            this.props.history.push('/personal');
        }
        componentDidMount(){

        }
        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = (state, props) => {
        return {
            token: state.userReducer.token,
        }
    }

    return connect(mapStateToProps)(Auth)

}
