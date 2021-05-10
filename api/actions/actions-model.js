const db = require('../../data/dbConfig.js');
const mappers = require('../../data/helpers/mappers');


module.exports = {
  getProjectsActions,
  get,
  insert,
  update,
  remove,
};

/* 
GET PROJECTS ACTIONS SQL

SELECT PROJECTS.ID, PROJECTS.NAME, ACTIONS.PROJECT_ID, ACTIONS.DESCRIPTION FROM [PROJECTS]
JOIN [ACTIONS]
ON ACTIONS.PROJECT_ID = PROJECTS.ID

*/

function getProjectsActions(projectId){
  
  get(projectId)
  .then((specificProject)=>{
    return specificProject.actions;
  })
  .catch((err)=>{
    console.log("FAILEd TO GET PROJECT BY ID", err);
  })

}


function get(id) {
  let query = db('actions');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((action) => {
        if (action) {
          return mappers.actionToBody(action);
        } else {
          return null;
        }
      });
  } else {
    return query.then((actions) => {
      return actions.map((action) => mappers.actionToBody(action));
    });
  }
}

function insert(action) {
  return db('actions')
    .insert(action, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('actions')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('actions').where('id', id).del();
}
