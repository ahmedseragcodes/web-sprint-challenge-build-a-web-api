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
 
 


module.exports = router;