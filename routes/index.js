var express = require('express');
var router = express.Router();
var conn = require('db');
var mysql = require('mysql');
/* GET home page. */
router.get('/',checkLogin());
router.get('/',function(req,res,next){
    req.cookies = parseCookie(req.headers.cookie);
    var adminid = req.cookies.adminid;
});


/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login/admin',function(req,res,next) {
    var adminTel = req.body.admintel;
    var adminPsd = req.body.adminpsd;
    console.log(req.body);
    conn.connect();
        conn.query('select * from admin_info where admin_tel="'+adminTel+'"and admin_psd="'+adminPsd+'"', function (error, results) {
            console.log(results);
            if (error) {
                console.log(error.message);
                res.redirect('/404');
            } else if (results == '' || results == null) {
                res.send(200,{data:1});
            } else {
                var adminid = results[0].adminid;
                res.setHeader('Set-Cookie','"adminid"="' + adminid+'"')
                res.send(200,{data:0});
            }
        });
    conn.end();
});
router.post('/login/user',function(req,res,next) {
    var username = req.body.username;
    var userpsd = req.body.userpsd;
    console.log(req.body);
    conn.connect();
    conn.query('select * from user where username="'+username+'"and userpsd="'+userpsd+'"', function (error, results) {
        console.log(results);
        if (error) {
            console.log(error.message);
            res.redirect('/404');
        } else if (results == '' || results == null) {
            res.send(200,{data:1});
        } else {
            var adminid = results[0].userid;
            res.setHeader('Set-Cookie','"userid"="' + userid+'"')
            res.send(200,{data:0});
        }
    });
    conn.end();
});

/* GET register page. */
router.get('/reg', function(req, res, next) {
    res.render('register');
});

router.post('/reg', function(req, res, next) {
    var userName = req.body.username;
    var adminTel = req.body.adminTel;
    var adminPsd = req.body.adminPsd;
    console.log(adminPsd);
});

router.post('/reg/check', function(req, res, next){
    var user = req.body;
    //var adminT = JSON.parse(admin);
    var userName = admin.userName;
    console.log(userName);
    console.log(req.body);
    //res.writeHead(200, 'ok');
    res.send(200,{data:0});
});


/* GET add_admin page. */
router.get('/add', function(req, res, next) {
    res.render('add_admin');
});

router.post('/add', function(req, res, next) {
    var adminName = req.body.adminName;
    var adminTel = req.body.adminTel;
    var adminPsd = req.body.adminPsd;
    console.log(adminPsd);
});

router.post('/add/check', function(req, res, next){
    var admin = req.body;
    //var adminT = JSON.parse(admin);
    var adminTel = admin.adminTel;
    console.log(adminTel);
    console.log(req.body);
    //res.writeHead(200, 'ok');
    res.send(200,{data:0});
});


/* GET 404 page. */
router.get('/404', function(req, res, next) {
    res.render('404');
});

function checkLogin(req, res, next) {
    req.cookies = parseCookie(req.headers.cookie);
    if (!req.cookies.adminid) {
        res.redirect('/login');
    }
    next();
}

function parseCookie(cookie){
    var cookies = {};
    if(!cookie){
        return cookies;
    }
    var list = cookie.split(";");
    for(var i=0;i<list.length;i++){
        var pair = list[i].split("=");
        cookies[pair[0].trim()] = pair[1];
    }
    return cookies;
}
module.exports = router;
