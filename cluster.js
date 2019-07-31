/**
 * cluster 모듈은 싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해준다.
 * 코어가 8개인 서버가 있을 때 노드는 보통 코어 하나만 활용하지만 cluster 모듈을 설정하여 코어 하나당 노드 프로세스 하나가 돌아가게 할 수 있다.
 * 하지만 세션을 공유하지 못하는 단점이 있어 Redis등의 서버를 도입해 해결 할 수있다.
 * 클러스터에는 마스터 프로세스와 워커 프로세스가 있다.
 * 마스터 프로세스는 CPU 개수만큼 워커 프로세스를 만들고 요청이 들어오면 만들어진 워커 프로세스에 요청을 분배한다.
 * 워커 프로세스가 실질적인 일을 하는 프로세스이다.
 */
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디 : ${process.pid}`);
    // CPU 개수만큼 워커를 생산
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        cluster.fork();
    });
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster</p>');
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }).listen(8085);

    console.log(`${process.pid}번 워커 실행`);
}