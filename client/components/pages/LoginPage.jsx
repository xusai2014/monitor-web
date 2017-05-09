import React from 'react';
import {loginForm,getVerfication,updateToken} from "../../actions/actions";
import { connect } from 'react-redux';
class LoginPage extends React.Component{

    loginhandler(){
        const {name,verfication} = this.refs;
        if (!name.value || !verfication.value){
            return;
        }

        if (name.value && verfication.value){
            this.props.dispatch(loginForm({
                tele:name.value,
                code:verfication.value
            }))
        }

    }
    handleVerification(){
        const val = "18800102517";
        this.props.dispatch(getVerfication(val))
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.props.history.push('/personal');
        }
    }
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
        if (authData) {
            this.props.dispatch(updateToken(authData));
            this.props.history.push('/personal');
        }

    }
    render(){
        return (
            <div>
                <div className="container">
                    <div className="row ">
                        <div className="col-xs-4">手机号码<input type="text" ref="name"/>
                            <button onClick={()=>{this.handleVerification()}}>获取验证码</button>
                        </div>
                        <div className="col-xs-4">验证码<input type="text" ref="verfication"/></div>
                        <div className="col-xs-4"><button onClick={()=>{
                            this.loginhandler()
                        }}>登陆</button></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        token: state.userReducer.token,
    }
}

export default connect(mapStateToProps)(LoginPage)