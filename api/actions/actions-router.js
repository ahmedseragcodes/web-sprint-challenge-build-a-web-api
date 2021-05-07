const express = require("express");
const { logger, validateActionId } = require("../middleware/middleware");
const Actions = require("./actions-model");

const router = express.Router();

//ENDPOINTS

//[GET] All Actions


router.get("/", logger, (req, res, next)=>{
    Actions.get()
    .then((allActions)=>{
        if (allActions){
            res.status(200).json(allActions);
        } else {
            res.status(404).json({message: "No actions found"});
        }
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
 });
 
//[GET] Action By Id


router.get("/:id", logger, validateActionId, (req, res, next)=>{


    const { id } = req.params;
 
 
    Actions.get(id)
    .then((specificAction)=>{
        if (specificAction){
            res.status(200).json(specificAction);
        } else {
            res.status(404).json({message: "No action found with that id"});
        }
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
 });
 
 //[POST] New Action

 router.post("/", logger, (req, res, next)=>{

    const newAction = req.body;

    if(!newAction.project_id || !newAction.description || !newAction.notes || (newAction.completed !== false && newAction.completed !== true)){
        res.status(400).json({message: "project_id, description, notes, and completed are required fields"});
    } else {
        Actions.insert(newAction)
        .then((newestAction)=>{
            res.status(201).json(newestAction);
        })
        .catch((err)=>{
            res.status(500).json({message: err.message});
        })
    } 


 })

 //[PUT] Update Action 

 router.put("/:id", logger, validateActionId, (req, res, next)=>{

    const { id } = req.params;

    const updatedAction = req.body;

    if(!updatedAction.project_id || !updatedAction.description || !updatedAction.notes || (updatedAction.completed !== false && updatedAction.completed !== true)){
        res.status(400).json({message: "project_id, description, notes, and completed are required fields"});
    } else {
        Actions.update(id, updatedAction)
        .then((newestVersionOfAction)=>{
            res.status(201).json(newestVersionOfAction);
        })
        .catch((err)=>{
            res.status(500).json({message: err.message});
        })
    } 


 })

//[DELETE] Action By Id

router.delete("/:id", logger, validateActionId, (req, res, next)=>{

    const { id } = req.params;

    Actions.remove(id)
    .then((finalResult)=>{
        res.status(200).json(finalResult);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
})


module.exports = router;