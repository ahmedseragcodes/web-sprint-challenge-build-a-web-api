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

//[GET] Project's Actions By Project Id

router.get("/:id/actions", logger, validateProjectId, (req, res, next)=>{
    
    const { id } = req.params;
    
    Projects.getProjectActions(id)
    .then((specificActions)=>{
        res.status(200).json(specificActions);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
});

//[POST] New Project

router.post("/", logger, (req, res, next)=>{

    const newProject = req.body;

    if(!newProject.name || !newProject.description || (newProject.completed !== false && newProject.completed !== true)){
        res.status(400).json({message: "Name, Description & Completed Are Required Fields"});
    } else {
        Projects.insert(newProject)
        .then((newestProject)=>{
            res.status(201).json(newestProject);
        })
        .catch((err)=>{
            res.status(500).json({message: err.message});
        })
    }

});

//[PUT] / Update Project

router.put("/:id", logger, validateProjectId, (req, res, next)=>{

    const { id } = req.params;

    const updatedProject = req.body;

    if(!updatedProject.name || !updatedProject.description || (updatedProject.completed !== false && updatedProject.completed !== true)){
        res.status(400).json({message: "Name, Description & Completed Are Required Fields"});
    } else {
        Projects.update(id, updatedProject)
        .then((newVersionOfProject)=>{
            res.status(200).json(newVersionOfProject);
        })
        .catch((err)=>{
            res.status(500).json({message: err.message});
        })
    }

});

//[DELETE] Project

router.delete("/:id", logger, validateProjectId, (req, res, next)=>{

    const { id } = req.params;

    Projects.remove(id)
    .then((finalResult)=>{
        res.status(200).json(finalResult);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
})

module.exports = router;