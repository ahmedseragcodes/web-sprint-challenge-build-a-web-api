const express = require("express");
const Projects = require("./projects-model");
const { logger, validateProjectId } = require("../middleware/middleware");

const router = express.Router();

//ENDPOINTS

//[GET] All Projects

router.get("/", logger, (req, res, next)=>{
    Projects.getAllProjects()
    .then((allProjects)=>{
        res.status(200).json(allProjects)
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
});

//[GET] Project By Id, Including its actions
router.get("/:id", logger, validateProjectId, (req, res, next)=>{

    const { id } = req.params;

    Projects.get(id)
    .then((specificProject)=>{
        res.status(200).json(specificProject);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })

});

//[POST] New Project

//[PUT] / Update Project

//[DELETE] Project

module.exports = router;