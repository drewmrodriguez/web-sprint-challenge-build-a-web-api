// add middlewares here related to projects
const Projects = require("../projects/projects-model.js");

async function validateProjectId(req, res, next) {
    const { id } = req.params;
    try {
      const project = await Projects.get(id);
      if (project) {
        req.project = project;
        next();
      } else {
        next({ message: `${id} is not a valid id.`, status: 404 });
      }
    } catch (err) {
      next({ error: err, message: err.message, status: 500 });
    }
  }
  
  function validateProjectBody(req, res, next) {
    const body = req.body;
    try {
      if (body && Object.keys(body).length === 0) {
        next({ message: "Provide name and description", status: 400 });
      } else if (!body.name) {
        next({ message: "missing project name", status: 400 });
      } else if (!body.description) {
        next({ message: "missing project description", status: 400 });
      } else {
        next();
      }
    } catch (err) {
      next({ message: err.message, status: 500 });
    }
  }
  
  module.exports = {
    validateProjectId: validateProjectId,
    validateProjectBody: validateProjectBody,
  };