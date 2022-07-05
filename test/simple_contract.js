const SimpleContract = artifacts.require('SimpleContract');
const truffleAssert = require('truffle-assertions');


contract('SimpleContract', (accounts) => {
    let instance;

    before("Should set up the contract instance", async function() {
        instance = await SimpleContract.deployed();
    });

    it("Should return the name", async function() {
        const name = await instance.getName();
        assert.equal(name, 'my name');
    });

    it("Should change the name", async() => {
        await instance.changeName('new name');
        const new_name = await instance.getName();

        assert.equal(new_name, 'new name');
    });

    it("Should only owner can change the name", async() => {
        await truffleAssert.reverts(instance.changeName('Only modifier', { from: accounts[1] }));
        const new_name = await instance.getName();

        assert.equal(new_name, 'new name');
    });

    it("Should check the type of events", async() => {
        const result = await instance.changeName('new name');
        truffleAssert.eventEmitted(result, 'NameEvent');
    });

    it('Should check the parameter of event', async() => {
        const result = await instance.changeName('new name');
        truffleAssert.eventEmitted(result, 'NameEvent', (event) => {
            return event.evPram == 'new name';
        });
    })





});