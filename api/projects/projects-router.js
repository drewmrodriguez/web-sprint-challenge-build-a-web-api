// Write your "projects" router here!
const router = require("express").Router();
const Projects = require("./projects-model.js");
const mw = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const project = await Projects.get();
    res.status(200).json(project);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

router.get("/:id", mw.validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    res.status(200).json(project);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

router.post("/", mw.validateProjectBody, async (req, res, next) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

router.put(
  "/:id",
  mw.validateProjectId,
  mw.validateProjectBody,
  async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    try {
      const updatedProj = await Projects.update(id, changes);
      res.status(202).json(updatedProj);
    } catch (err) {
      next({ error: err, message: err.message, status: 500 });
    }
  }
);

router.delete("/:id", mw.validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProj = await Projects.remove(id);
    res.status(204).json(deletedProj);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

router.get("/:id/actions", mw.validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const projActions = await Projects.getProjectActions(id);
    res.status(200).json(projActions);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

module.exports = router;