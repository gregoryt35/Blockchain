const SHA256 = require('crypto-js/sha256'); // I have a question about what this does?

class Block { // this initializes a singular Block object with the following variables.
    constructor(index, timestamp, data, previousHash="") {
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
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let btCoin = new Blockchain();
btCoin.addBlock(new Block(1, "1/2/2022", {name: "TM", amount: 4}));
btCoin.addBlock(new Block(2, "2/2/2022", {name: "TMI", amount: 4}));
console.log(JSON.stringify(btCoin, null, 4));

/*
Each block has a different hash so that it can be unique so that each block has its own signature.
The input is different since there is a different ID and a different date and different names and different amounts for each block.
We should code a function that checks if the hashes are the same or not for each block to make sure the chain is valid.
*/
