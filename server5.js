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


const session = {};

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query) ;
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);

        /*
            server4.js의 사용자 정보가 노출되는 문제점을 위한 해경 방식
            쿠키에 이름을 담아서 보내는 대신 randomInt라는 임의의 숫자를 생성해 보낸다.

            이 방식이 세션이다.

            하지만 이 방식 역시 세션 아이디 값이 공개되어 있기 떄문에 보안에 매우 취약하다.
            실제 서비스에서는 이와 같이 하면 절대 안된다.
        */
        const randomInt = +new Date();

        console.log('임의의 값 : ' + randomInt)

        session[randomInt] = {
            name,
            expires,
        };

        res.writeHead(302, {
            Location : '/',
            'Set-Cookie' : `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        res.writeHead(200, {'Content-Type' : 'text/html; charset=UTF-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요.`);
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    }
}).listen(8084, () => {
    console.log('8084번 포트에서 서버 대기중!');
});