const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => cookie.split(';')
                                            .map(v => v.split('='))
                                            .map(([k, ...vs]) => [k, vs.join('=')])
                                            .reduce((acc, [k, v]) => {
                                                acc[k.trim()] = decodeURIComponent(v);
                                                return acc;
                                            }, {});

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        /*
            [쿠키 설정 옵션]
            쿠키명 : 기본적인 쿠키 값
            Expires : 만료 기한, 이 기한이 지나면 쿠키가 제거된다.
            Max-age : Expires와 비슷하지만 날짜 대신 초를 입력할 수 있다.
            Domain : 쿠키가 전송될 도메일을 특정할 수 있다.
            Path : 쿠키가 전송될 URL을 특정할 수 있다.
            Secure : Https일 경우에만 쿠키가 전송된다.
            HttpOnly : 설정 시 자바스크립트에서 쿠키에 접근할 수 없다.

            이 방식은 쿠키에 사용자 정보가 그대로 노출되기 때문에 위험한 방식이다.
            따라서 서버가 사용자 정보를 관리하도록 만든다.
        */ 
        res.writeHead(302, {
            Location : '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.name) {
        res.writeHead(200, {'Content-Type' : 'text/html; charset=UTF-8'});
        res.end(`${cookies.name}님 안녕하세요.`);
    } else {
        fs.readFile('./server4.html', (err,data) => {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    }
}).listen(8083, () => {
    console.log('8083번 포트에서 서버 대기중!');
});