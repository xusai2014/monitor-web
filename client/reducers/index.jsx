
import md5 from  'js-md5';
var initialState = {
    orgnization: [],
    orgnizationDetail: {},
    token: null,
    telecode: "",
    userInfo:{},
    bindInfo:[],
    insertSuccess:false,
}


export function orgnizationReducer (state = initialState, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        case "GET_Zhuanli_Search_SUCCESS":

            return {
                ...state,
                orgnization:action.result.data
            }
        case "GET_Detail_SUCCESS":
            return {
                ...state,
                orgnizationDetail:action.result.data
            }
        case "Post_login_SUCCESS":
            return state;
        default:
            return state;
    }
}
export function itemsReducer (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}

export function userReducer(state= initialState, action) {
    switch (action.type) {
        // etc.
        case "Post_login_SUCCESS":
            const str = md5(`${action.data.tele}${state.telecode.code}`);
            debugger
            if(action.result.data === str ||(document.cookie.indexOf(str)>0) ){
                return {
                    ...state,
                    token:action.result.data,
                    userInfo:action.data
                };
            }
            return state;

        case "upadte_token":
            const str1 = md5(`${action.data.tele}${action.data.code}`);
            return {
                ...state,
                token:str1,
                userInfo:action.data
            };
        case "Get_code_SUCCESS":
            return{
                ...state,
                telecode:action.result.data,
            };
        case "Get_userInfo_SUCCESS":
            return{
                ...state,
                bindInfo:action.result.data,
            };
        case "Get_insert_SUCCESS":
            return{
                ...state,
                insertSuccess:!state.insertSuccess,
            };
        default:
            return state;
    }
}