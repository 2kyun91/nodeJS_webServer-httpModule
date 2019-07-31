/* 
    https 모듈은 웹 서버에 SSL 암호화를 추가한다.
    GET, POST 요청을 할 때 오고 가는 데이터를 암호화 해서 다른 사람이 가로채더라도 내용을 알 수 없게 해준다, 로그인이나 결제가 필요한 창에서 필수이다.
    https를 사용하기 위해서는 그것을 인증해줄 수 있는 기관이 필요하다.
    인증서는 인증기관에서 구입해야 하는데 Let's Encrypt 같은 기관에서 무료로 발급해주기도 한다.
    인증서를 구입하면 pem, crt, key 확장자를 가진 파일을 제공해준다.
    파일들을 fs.readFileSync()로 읽어서 옵션에 맞게 넣어주면 된다.
*/ 
const https = require('https');
const fs = require('fs');

https.createServer({
    cert : fs.readFileSync('도메인 인증서 경로'),
    key : fs.readFileSync('도메인 비밀키 경로'),
    ca : [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(443, () => {
    console.log('443번 포트에서 서버 대기 중!');
});