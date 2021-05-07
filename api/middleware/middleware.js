const Projects = require("../projects/projects-model");
const Actions = require("../actions/actions-model");

function logger(req, res, next){

    console.log(`Method: ${req.method} URL: ${req.url} Date: ${new Date()}`);
    next();
}

function validateProjectId(req, res, next){
    
    const { id } = req.params;
    
    Projects.get(id)
    .then((specificProject)=>{
        if(specificProject){
            next();
        } else {
            res.status(404).json({message: "No project with that Id found"});
        }
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
}

function validateActionId(req, res, next){
    
    const { id } = req.params;
    
    Actions.get(id)
    .then((specificAction)=>{
        if(specificAction){
            next();
        } else {
            res.status(404).json({message: "No Action with that Id found"});
        }
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
}

module.exports = {
    logger,
    validateProjectId,
    validateActionId
}