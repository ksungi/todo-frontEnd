let backendHost;

const hostname = window && window.location && window.location.hostname;

console.log("hostname: ", hostname);
if(hostname === "localhost") {
    backendHost = "http://localhost:8080";
}
// else {
//     backendHost = "http://172.30.122.189:8080";
// }
// 백엔드호스트에 ipconfig > ipv4 주소를 입력하면 같은 네트워크 상에서는 가능 

export const API_BASE_URL = `${backendHost}`;