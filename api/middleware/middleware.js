
function logger(req, res, next){

    console.log(`
    Method: ${req.method}
    URL: ${req.url}
    Date: ${new Date.now()}
    `);
    next();
}

module.exports = logger;