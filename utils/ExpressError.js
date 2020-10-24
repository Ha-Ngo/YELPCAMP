class ExpressError extends Error {
    constructor (message, statusCode) {
        super ();
        this.message = message;
        this.statsCode = statusCode;
    }
}

module.exports=ExpressError;