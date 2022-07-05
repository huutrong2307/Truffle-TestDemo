const SimpleContract = artifacts.require('SimpleContract');

contract('SimpleContract', (accounts) => {
    let instance;

    before("Should set up the contract instance", async function() {
        instance = await SimpleContract.deployed();
    });

    it("Should return the name", async function() {
        const name = await instance.getName();
        assert.equal(name, 'my name');
    });

    it("Should change the name")

});