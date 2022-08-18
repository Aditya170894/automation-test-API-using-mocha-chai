const chai = require('chai');
const expect = chai.expect;
const api = require('../api/api-revisi');
const payload = require('../data/update-data.json');
const updateData = require('../scenarios/update-data-profile');
const jsonSchema = require('../schemas/update-user.json');

chai.use(require('chai-like'));
chai.use(require('chai-json-schema'));

describe(`${updateData.testcase.description}`, async () => {
      
    it(`${updateData.testcase.positive.case1}`, async () => {
        
        let response = await api.putUser(payload);
        let bodyData = response.body;

        expect(response.status).to.equal(200);
        expect(bodyData.occupation).to.equal('Dev Ops');
        expect(bodyData.nationality).to.equal('Jepang');
        expect(bodyData).has.jsonSchema(jsonSchema);

    })

    it(`${updateData.testcase.negative.case1}`, async () => {
        
        let response = await api.putUser(payload);
        let bodyData = response.body;

        expect(bodyData.errorCode).to.equal("ER-03");
        expect(response.status).to.equal(400);
        expect(bodyData.message).to.equal("you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender")
    })

    it(`${updateData.testcase.negative.case2}`, async () => {

        let response = await api.putUser(payload);
        let bodyData = response.body;

        expect(bodyData.errorCode).to.equal("ER-03");
        expect(response.status).to.equal(400);
        expect(bodyData.message).to.equal("you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender")
    })

    it(`${updateData.testcase.negative.case3}`, async () => {

        let response = await api.putUser(payload);
        let bodyData = response.body;
    
        expect(bodyData.errorCode).to.equal("ER-01");
        expect(response.status).to.equal(404);
        expect(bodyData.message).to.equal("user not found")        
    })
})