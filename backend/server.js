//필요한 모듈들 가져오기
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

//Express 서버를 실행
const app = express();

//json 형태로 오는 요청의 본문을 해석해줄 수 있도록 등록
app.use(bodyParser.json());

//테이블 생성하기
// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fields) => {
//     console.log('results', results)
// })

//DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', function(req,res){
    //데이터베이스에서 모든 정보 가져오기
    db.pool.query('SELECT * FROM lists',
        (err, results, fields) => {
            if(err)
                return res.status(500).send(err)
            else
                return res.json(results)
        })
})

//클라이언트에서 입력한 값을 데이터베이스 lists안에 넣는다.
app.post('/api/value', function(re, res, next){
    //데이터베이스에 값 넣기
    db.pool.query(`INSERT INTO lists(value) values("${req.body.value}")`,
        (err, results, fields) => {
            if(err)
                return res.status(500).send(err)
            else
                return res.json({ success: true, value: req.body.value })
        })
})

app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 실행되었습니다.');
})
