function getUser() { // 로딩 시 사용자가 가져오는 함수이다.
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            var users = JSON.parse(xhr.responseText);
            var list = document.getElementById('list');
            list.innerHTML = '';
            Object.keys(users).map(function (key) {
                var userDiv = document.createElement('div');
                var span = document.createElement('span');
                span.textContent = users[key];
                var edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', function () {
                    var name = prompt('바꿀 이름을 입력하세요.');

                    if (!name) {
                        return alert('이름을 반드시 입력하셔야 합니다.');
                    }

                    var xhr = new XMLHttpRequest();

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('PUT', '/users/' + key);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({name : name}));
                });

                var remove = document.createElement('button');
                remove.textContent = '삭제';
                remove.addEventListener('click', function () {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE', '/users/' + key);
                    xhr.send();
                });

                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            });
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET', '/users'); 
    xhr.send();
}

window.onload = getUser; // 페이지가 로딩되면 getUser() 함수를 호출하여 GET /users로 사용자 목록을 가져온다.

document.getElementById('form').addEventListener('submit', function (e) {
    // form을 제출할 때는 POST /users로 데이터와 함께 요청을 보낸다.
    e.preventDefault();
    var name = e.target.username.value;
    if (!name) {
        return alert('이름을 입력하세요');
    }
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log(xhr.responseText);
            getUser();
        } else {
            console.error(xhr.responseText);
        }
    };

    xhr.open('POST', '/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({name : name}));
    e.target.username.value = '';
});