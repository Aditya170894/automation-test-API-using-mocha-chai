const httpCaller = require('supertest');
const serverAPI = httpCaller('http://localhost:1234');

function getUserById(inputId) {
    return serverAPI.get(`/v1/users/${inputId}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json'); 
}

function postUser(bodyRequestData) {
    return serverAPI.post('/v1/users')
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send(bodyRequestData);
}

function putUser(bodyRequestData) {
    return serverAPI.put(`/v1/users`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send(bodyRequestData);
}

function delUser(inputId){
    return serverAPI.del(`/v1/users/${inputId}`)
        .set('Connection', 'keep-alive');
}

module.exports = {
    getUserById,
    postUser,
    putUser,
    delUser,
};