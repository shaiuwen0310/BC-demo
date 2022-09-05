class invokeOrderformResponseFormat {
    constructor(uniqueKey, time, txid, rtnc, message) {
        this.uniqueKey = uniqueKey,
            this.time = time,
            this.txid = txid,
            this.rtnc = rtnc,
            this.message = message
    }

    setUniqueKey(value) {
        this.uniqueKey = value
    }

    setTime(value) {
        this.time = value
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

    getUniqueKey() {
        return this.uniqueKey
    }

    getTime() {
        return this.time
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

class queryOrderformResponseFormat {
    constructor(uniqueKey, rtnc, message, info) {
        this.uniqueKey = uniqueKey,
            this.rtnc = rtnc,
            this.message = message,
            this.info = info
    }

    setUniqueKey(value) {
        this.uniqueKey = value
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

    getUniqueKey() {
        return this.uniqueKey
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

module.exports = {
    invokeOrderformResponseFormat: invokeOrderformResponseFormat,
    queryOrderformResponseFormat: queryOrderformResponseFormat
}

