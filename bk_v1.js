const SHA256 = require('crypto-js/sha256'); // I have a question about what this does?

class Block { // this initializes a singular Block object with the following variables.
    constructor(index, timestamp, data, previousHash="") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash=previousHash;
        this.hash = calculateHash();
    }

    calculateHash() { // this calculates a given hash based on the hash of the previous block.
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain { // this initializes a Blockchain that contains multiple blocks from the previous class.
    constructor() {
        this.chain = [];
    }

    createGenesisBlock() { // this initializes the first block of the blockchain, known as the Genesis Block.
        return new Block(0, "03/01/2009", "Genesis Block", "0");
    }
}