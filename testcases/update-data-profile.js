const chai = require('chai');
const expect = chai.expect;
const api = require('../api/api-revisi');
const payload = require('../data/update-data.json');
const zeroAge = require('../data/update-age-zero.json');
const noHobbies = require('../data/update-no-hobbies.json');
const nullId = require('../data/update-null-id.json');
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
        let response = await api.putUser(zeroAge);
        let bodyData = response.body;

        expect(bodyData.errorCode).to.equal("ER-03");
        expect(response.status).to.equal(400);
        expect(bodyData.message).to.equal("you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender")
    })

    it(`${updateData.testcase.negative.case2}`, async () => {
        let response = await api.putUser(noHobbies);
        let bodyData = response.body;

        expect(bodyData.errorCode).to.equal("ER-03");
        expect(response.status).to.equal(400);
        expect(bodyData.message).to.equal("you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender")
    })

    it(`${updateData.testcase.negative.case3}`, async () => {
        let response = await api.putUser(nullId);
        let bodyData = response.body;
    
        expect(bodyData.errorCode).to.equal("ER-01");
        expect(response.status).to.equal(404);
        expect(bodyData.message).to.equal("user not found")        
    })
})
describe("Delete User", async () => {
    it('[@deleteUser] delete user', async () => {
        let userId = "3fa88cfd-963a-4734-96ed-d62134c6a70f";
        let response = await api.getUserById(userId);
        let bodyData = response.body;

        expect(response.status).to.equal(200);
        expect(bodyData.id).be.like(userId);
    })
 })