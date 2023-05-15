const SHA256 = require('crypto-js/sha256'); // I have a question about what this does?

class Block { // this initializes a singular Block object with the following variables.
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; //this is the nonce
    }

    calculateHash() { // this calculates a given hash based on the hash of the previous block.
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
           // inside calculate the hash of this block
            this.hash = this.calculateHash();
            this.nonce++; //increment the nonce as long as our hash doesn't start with enough zeros 
            console.log("Block mined " + this.hash);
        }
    }
}

class Blockchain { // this initializes a Blockchain that contains multiple blocks from the previous class.
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
    }

    createGenesisBlock() { // this initializes the first block of the blockchain, known as the Genesis Block.
        return new Block(0, "03/01/2009", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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

console.log("Mining Block #1...");
btCoin.addBlock(new Block(1, "1/2/2022", {name: "TM", amount: 4}));
btCoin.chain[0].mineBlock(1);

console.log("Mining Block #2...");
btCoin.addBlock(new Block(2, "2/2/2022", {name: "TMI", amount: 10}));
btCoin.chain[1].mineBlock(1);

console.log("Mining Block #3...");
btCoin.addBlock(new Block(3, "2/2/2022", {name: "TMT", amount: 16}));
btCoin.chain[2].mineBlock(1);

// 1) What do you notice about the mining process based on adjusting the mining difficulty from 1 to 2, then 3 and then 4?
// It takes longer to mine.

// 2) What do you think is the relationship between the amount of zeros in the hash and the difficulty?
// The more difficulty there is, the more zeroes.

// 3) What makes this mechanism a good security/safety validator for our simulation chain? Explain.
// This ensures that the appropriate amount of resources and energy are being used for mining.

// 4) What is your open ended question/ or comment about our Blockchain version #4?
// I find it intruiging how the process of validation happens.