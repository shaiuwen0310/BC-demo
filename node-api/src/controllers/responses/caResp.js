class caResponseFormat {
    constructor(identity, rtnc, message) {
        this.identity = identity,
            this.rtnc = rtnc,
            this.message = message
    }

    setIdentity(value){
        this.identity = value
    }

    setRtnc(value){
        this.rtnc = value
    }

    setMessage(value){
        this.message = value
    }

    getIdentity(){
        return this.identity
    }

    getRtnc(){
        return this.rtnc
    }

    getMessage(){
        return this.message
    }
}

module.exports = {
    caResponseFormat: caResponseFormat
}