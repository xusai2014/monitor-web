import md5 from  'js-md5';
export function setNameActionCreator (name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}

export function getOrgization(data) {

    return{
        types:['GET_Zhuanli_Search_REQUEST', 'GET_Zhuanli_Search_SUCCESS', 'GET_Zhuanli_Search_FAILURE'],
        data:data,
        promise:()=>{
            return new Promise((resolve, reject) => {
                var req = new Request("/data/orgnization.json");
                fetch(req).then(function(response) {
                    response.json().then(function(data) {
                        resolve({data:data.orgnizations})
                    });

                }).catch(function(err) {
                    reject({err:err})
                });
            })
        }
    }

}

export function getOrgizationDetail(id) {

    return{
        types:['GET_Detail_REQUEST', 'GET_Detail_SUCCESS', 'GET_Detail_FAILURE'],
        data:id,
        promise:()=>{
            return new Promise((resolve, reject) => {
                var req = new Request("./data/orgnization.json");
                fetch(req).then(function(response) {
                    response.json().then(function(data) {

                        resolve({data:data.orgnizations[0]})
                    });

                }).catch(function(err) {
                    reject({err:err})
                });
            })
        }
    }

}

export function loginForm(data) {
    return{
        types:['Post_login_REQUEST', 'Post_login_SUCCESS', 'Post_login_FAILURE'],
        data:data,
        promise:()=>{
            return new Promise((resolve, reject) => {

                setTimeout(function () {
                    debugger;
                    if(data){
                        const str = md5(`${data.tele}${data.code}`)
                        localStorage.setItem('authData', JSON.stringify(data));
                        var date=new Date();
                        var expireDays=1; //将date设置为10天以后的时间
                        date.setTime(date.getTime()+expireDays*24*3600*1000); //将userId和userName两个cookie设置为10天后过
                        document.cookie = `token=${str};expire=${date.toGMTString()}`
                        resolve({data:str})
                    }
                },2000)
            })
        }
    }
}

export function updateToken(authData,cookie) {
    return {
        type: "upadte_token",
        data: {authData},

    };
}

export function getVerfication(num) {
    return {
        types:['Get_code_REQUEST', 'Get_code_SUCCESS', 'Get_code_FAILURE'],
        data:num,
        promise:()=>{
            return new Promise((resolve, reject) => {
                const req = new Request("./veryfication",{
                    method: "POST",
                    type:"application/json",
                    body: JSON.stringify({num}),
                    headers:{ "Content-Type":"application/json", },
                });
                fetch(req).then(function(response) {
                    response.json().then((data)=>{

                        resolve({
                            data:data
                        })}
                    )

                }).catch(function(err) {
                    reject({
                        err:"请求出错"
                    });
                })
            })
        },
    }

}

export function getUserInfo(tele) {
    return {
        types:['Get_userInfo_REQUEST', 'Get_userInfo_SUCCESS', 'Get_userInfo_FAILURE'],
        data:tele,
        promise:()=>{
            return new Promise((resolve, reject) => {
                const req = new Request("./api/getuser",{
                    method: "POST",
                    type:"application/json",
                    body: JSON.stringify({tele}),
                    headers:{ "Content-Type":"application/json", },
                });
                fetch(req).then(function(response) {
                    response.json().then((data)=>{

                        resolve({
                            data:data.docs,
                        })}
                    )
                }).catch(function(err) {
                    reject({
                        err:"请求出错"
                    });
                })
            })
        },
    }
}

export function insertUserInfo(data) {
    return {
        types:['Get_insert_REQUEST', 'Get_insert_SUCCESS', 'Get_insert_FAILURE'],
        data:data,
        promise:()=>{
            return new Promise((resolve, reject) => {
                const req = new Request("./api/user",{
                    method: "POST",
                    type:"application/json",
                    body: JSON.stringify({data}),
                    headers:{ "Content-Type":"application/json", },
                });
                fetch(req).then(function(response) {
                    response.json().then((data)=>{

                        resolve({
                            data:data
                        })}
                    )

                }).catch(function(err) {
                    reject({
                        err:"请求出错"
                    });
                })
            })
        },
    }
}