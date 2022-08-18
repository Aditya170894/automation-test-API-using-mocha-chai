const chai = require('chai');
const expect = chai.expect;
const api = require('../api/api-revisi');
const getId = require('../scenarios/search-user-by-id')
const jsonSchema = require('../schemas/search-user-by-id-schemas.json');

chai.use(require('chai-like'));
chai.use(require('chai-json-schema'));

describe(`${getId.testcase.description}`, async () => {
    it(`${getId.testcase.positive.case1}`, async () => {
        let userId = "40013063-8658-47b6-9993-3a147b392aba";
        let response = await api.getUserById(userId);
        let bodyData = response.body;

        expect(response.status).to.equal(200);
        expect(bodyData.id).be.like(userId);
        expect(response.body).has.jsonSchema(jsonSchema);
    })

    it(`${getId.testcase.negative.case1}`, async () => {
        let userId = "12345";
        let response = await api.getUserById(userId);
        let bodyData = response.body;
        expect(bodyData.errorCode).to.equal("ER-01");
        expect(response.status).to.equal(404);
        expect(bodyData.message).to.equal("user not found")
    })
})