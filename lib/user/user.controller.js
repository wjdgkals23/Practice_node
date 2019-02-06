'use strict';

var users = [{
    id: 1,
    name: 'alice'
}, {
    id: 2,
    name: 'bek'
}, {
    id: 3,
    name: 'chris'
}];

exports.index = function (req, res) {
    return res.json(users);
};

exports.show = function (req, res) {
    var id = parseInt(req.params.id, 10);
    if (!id) {
        // id에 0이 있을 경우 && id !== 0 추가
        return res.status(400).json({ error: 'Incorrect id' });
    }

    var user = users.filter(function (user) {
        return user.id === id;
    })[0];
    if (!user) {
        // 없는 유저 조회시
        return res.status(404).json({ error: 'Unknown user' });
    }

    return res.json(user);
};

exports.delete = function (req, res) {
    var id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    var userIdx = users.findIndex(function (user) {
        return user.id === id;
    });
    if (userIdx === -1) {
        return res.status(404).json({ error: 'Unknown user' });
    }

    users.splice(userIdx, 1);
    res.status(204).send();
};

exports.create = function (req, res) {
    var name = req.body.name || "";
    if (name.length === 0) {
        res.status(400).json({ error: 'Incorrect name' });
    }

    var id = users.reduce(function (maxId, user) {
        return user.id > maxId ? user.id : maxId;
    }, 0) + 1;

    var newUser = {
        id: id,
        name: name
    };
    users.push(newUser);

    return res.status(201).json({ success: "make new user success" });
};