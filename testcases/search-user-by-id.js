const chai = require('chai');
const expect = chai.expect;
const api = require('../api/api-revisi');
const requestBody = require('../data/create-user.json');
const getId = require('../scenarios/search-user-by-id')
const jsonSchema = require('../schemas/search-user-by-id-schemas.json');
const createSchema = require('../schemas/create-user-schemas.json');

chai.use(require('chai-like'));
chai.use(require('chai-json-schema'));

describe("Create User", async () => {
   it('[@createUser] create new user', async () => {
    let response = await api.postUser(requestBody);                
    expect(response.status).to.equal(200); 
    expect(response.body).has.jsonSchema(createSchema);
   })
})

describe(`${getId.testcase.description}`, async () => {

    it(`${getId.testcase.positive.case1}`, async () => {
        let userId = "9da80a4e-38a3-4fa6-b71f-4166ee9e6621";
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