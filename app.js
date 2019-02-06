const express = require('express');
const app = express(); // 서버를 셋팅하고 서버를 구동하는 역할
const bodyParser = require('body-parser');

app.use(express.static('public')); // 서버 셋팅 - 정적파일 셋팅

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", require('./api/user'));

// 라우팅: 클라이언트 요청과 서버의 로직을 연결하는것
app.get('/', (req, res) => {
    res.send('Hello World!\n');
});

app.listen(3000, () => { // 서버 구동
    console.log('Example app listening on port 3000!');
});
