class invokeRespFmt {
    constructor(hash, txid, rtnc, message) {
        this.hash = hash,
            this.txid = txid,
            this.rtnc = rtnc,
            this.message = message
    }

    setHash(value) {
        this.hash = value
    }


    setTxid(value) {
        this.txid = value
    }

    setRtnc(value) {
        this.rtnc = value
    }

    setMessage(value) {
        this.message = value
    }

    gethash() {
        return this.hash
    }
    
    getTxid() {
        return this.txid
    }

    getRtnc() {
        return this.rtnc
    }

    getMessage() {
        return this.message
    }
}

class queryRespFmt {
    constructor(hash, rtnc, message, info) {
        this.hash = hash,
            this.rtnc = rtnc,
            this.message = message,
            this.info = info
    }

    sethash(value) {
        this.hash = value
    }

    setRtnc(value) {
        this.rtnc = value
    }

    setMessage(value) {
        this.message = value
    }

    setInfo(value) {
        this.info = value
    }

    getHash() {
        return this.hash
    }

    getRtnc() {
        return this.rtnc
    }

    getMessage() {
        return this.message
    }

    getInfo() {
        return this.info
    }
}

class delRespFmt {
    constructor(hash, rtnc, message) {
        this.hash = hash,
            this.rtnc = rtnc,
            this.message = message
    }

    setHash(value) {
        this.hash = value
    }

    setRtnc(value) {
        this.rtnc = value
    }

    setMessage(value) {
        this.message = value
    }

    gethash() {
        return this.hash
    }

    getRtnc() {
        return this.rtnc
    }

    getMessage() {
        return this.message
    }
}

module.exports = {
    invokeRespFmt: invokeRespFmt,
    queryRespFmt: queryRespFmt,
    delRespFmt: delRespFmt
}

