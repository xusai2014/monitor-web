import React from 'react';
import { connect } from 'react-redux';
import {getUserInfo,insertUserInfo} from '../../actions/actions'


class ArticlesList extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            inputWarinig:''
        }
    }
    componentWillMount(){
        const {authData}  = this.props.userInfo;
        const tele  = JSON.parse(authData).tele;
        this.props.dispatch(getUserInfo(tele));
    }
    insertBindInfo(){

        const {account,tele} = this.refs;
        if (!account.value || !tele.value){
            this.setState({inputWarinig:"请正确填写表单"});
            return;
        }

        if (account.value && tele.value){
            if(!(/^1[34578]\d{9}$/.test(tele.value))){
                this.setState({inputWarinig:"请正确填写手机号"});
                return false;
            }
            this.props.dispatch(insertUserInfo({
                account:account.value,
                tele:tele.value
            }))
        }
    }
    componentWillReceiveProps(next){
        if(this.props.insertSuccess != next.insertSuccess){
            const {authData}  = this.props.userInfo;
            const tele  = JSON.parse(authData).tele;
            debugger;
            this.props.dispatch(getUserInfo(tele));
        }
    }
    render(){
        const {bindInfo} = this.props;
        const {authData}  = this.props.userInfo;
        const tele  = JSON.parse(authData).tele;
        return( <div>
                <div className="container">
                    {
                        bindInfo.map((v,k)=>{
                            return (<div key={k}>账户:{v.account},手机号:{v.tele} </div>);
                        })
                    }
                    <div>
                        账户<input type="text" ref="account"/>
                        手机号<span>{tele}</span>
                        <button onClick={()=>{this.insertBindInfo()}}>绑定</button>
                        {this.state.inputWarinig ?<span>提示信息:{this.state.inputWarinig}</span>:"" }
                    </div>
                </div>

            </div>
        )



    }

}

const mapStateToProps = (state, props) => {
    return {
        token: state.userReducer.token,
        userInfo: state.userReducer.userInfo,
        bindInfo:state.userReducer.bindInfo,
        insertSuccess:state.userReducer.insertSuccess,
    }
}

export default connect(mapStateToProps)(ArticlesList)