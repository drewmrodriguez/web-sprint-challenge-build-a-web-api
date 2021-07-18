// Write your "actions" router here!
const router = require("express").Router();
const Actions = require("./actions-model.js");
const mw = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    const action = await Actions.get();
    res.status(200).json(action);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});
router.get("/:id", mw.validateActionId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    res.status(200).json(action);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

router.post("/", mw.validateActionBody, async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

router.put(
  "/:id",
  mw.validateActionId,
  mw.validateActionBody,
  async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    try {
      const updatedAction = await Actions.update(id, changes);
      res.status(200).json(updatedAction);
    } catch (err) {
      next({ error: err, message: err.message, status: 500 });
    }
  }
);

router.delete("/:id", mw.validateActionId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Actions.remove(id);
    res.status(204).json(action);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

module.exports = router;