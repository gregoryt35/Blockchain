/*
Gregory Tomchuk
Cybersecurity Periods 7-8 Odd
5/23/23
Blockchain Version 5
*/

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

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Blockchain { // this initializes a Blockchain that contains multiple blocks from the previous class.
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransactions = [];
        this.miningReward = 50;
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

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        // mine the block
        block.mineBlock(this.difficulty);
        console.log("Block successfully mined");
        // add the block to the chain
        this.chain.push(block);

        // reset the pending transactions
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    // create a method that checks the balance of an address
    getBalanceOfAddress(address) {
    // TYPE THE CODE => balance starts at 0 
    // loop over each block of this chain ( Hint: for..of loop) 
    // loop over each transaction of this block ( Hint: nested for..of loop) 
            if (trans.fromAddress===address) {
                                 // TYPE THE CODE => reduce the balance because it comes from you
                if(trans.toAddress===address) {
                          // TYPE THE CODE =>increase your balance
                     // close the inner loop
                  //close the the outer loop
              //return balance you have when done looping
            }   // end of the method
    
        }
    }

    getExtraReward(max) {
        return Math.floor(Math.random() * max);
    }
}

let btCoin = new Blockchain();

// send 90 coins from address 1 to address 2  
btCoin.createTransaction(new Transaction('address1', 'address2', 90));
//TYPE code to send 60 coins from address 2 to 1
btCoin.createTransaction(new Transaction('address2', 'address1', 60));
//TYPE code to send 100 coins from address 2 to 1
btCoin.createTransaction(new Transaction('address2', 'address1', 100));

// after we create those transactions, they will be pending
console.log('\nStarting miner 1..');
// TYPE THE CODE to apply the method minePendingTransactions (‘Alice-address’) to your coin


//TYPE THE CODE to check the balance 
console.log("Reward balance of Alice is", )); 


// What have you learned about the blockchain mechanism during the process of extending our simulated chain in part 5? Did you expect this when we started the part 1 of our chain? How has your knowledge on blockchain has evolved during our lessons and programming the simulated simplified chain?
// What I learned was 

// What went well and what didn’t go as expected?
// What went well was implementing my own implementations to the code. What didn't go as expected was doing the testing and the debugging since it was tedioius.

// How did you extend the program using the creative spinning wheel part? 
// I did not extend the program.

// What open ended question(s) do you have now? 
// A question I have is if this entire project is most of the implementation of the blockchain, or are there other essential aspects that were not included.

// Rate the difficulty of the project ( including all concepts and code) overall from 1 ( very easy) to 5 ( very difficult) 
// I would give this project a 3 because once the code was figured out, the rest was not bad.