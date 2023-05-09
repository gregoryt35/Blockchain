/* 
Gregory Tomchuk
Web Development Periods 7-8
5/9/23
*/

const SHA256 = require('crypto-js/sha256'); // I have a question about what this does?

class Block { // this initializes a singular Block object with the following variables.
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash=previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() { // this calculates a given hash based on the hash of the previous block.
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain { // this initializes a Blockchain that contains multiple blocks from the previous class.
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() { // this initializes the first block of the blockchain, known as the Genesis Block.
        return new Block(0, "03/01/2009", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash != prevBlock.calculateHash()) {
                return false;
            }
        }
        return true;
    }
}

let btCoin = new Blockchain();
btCoin.addBlock(new Block(1, "1/2/2022", {name: "TM", amount: 4}));
btCoin.addBlock(new Block(2, "2/2/2022", {name: "TMI", amount: 4}));
btCoin.addBlock(new Block(3, "3/2/2022", {name:"TMT", amount: 4}));
btCoin.addBlock(new Block(4, "4/2/2022", {name:"TMZ", amount: 4}));
console.log(JSON.stringify(btCoin, null, 4));

btCoin.chain[1].data = {amount: 100};
btCoin.chain[1].hash = btCoin.chain[1].calculateHash();

console.log("Is the chain valid?" + btCoin.isChainValid());

/*
What we did was test for if the chain is valid if the hashes are what they should be.
We got results of both true and false depending on how we changed our blockchain.
This means that we need to ensure that our hashes are not the same as the previous blocks since they have to be unique.
I wonder how this works on a larger scale.
*/ 