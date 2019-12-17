let taken = sessionStorage.getItem("token");

let ip = "127.0.0.1";
let port = 8081;
let origin = ip + ":" + port;
let wsUrl = window.location.protocol === "http:"? "ws://" : "wss://";
let baseUrl = window.location.protocol + "//" + origin;
let base_wsUrl = wsUrl + origin;

let apiConfig;

function initApiConfig(){
  return {
     loginUrl : baseUrl + "/user/login",
     registerUrl : baseUrl + "/user/register",

    verify : {
       getImgUrl : baseUrl + "/verify/getImg"
    }
  };
}

apiConfig = initApiConfig();

export {
  apiConfig
}
