
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const isAuthorized = require('../middleware/isAuthorized');


router.get("/", [isAuthorized], async function(req, res) {
  return  res.json(await User.find());
});

router.get("/:id", isAuthorized, async (req, res) => {
  const {id} = req.params;

  const result = await User.findById(id);
  return result 
    ? res.json(result)
    : res.status(404).send();
});


router.post("/", async (req, res) => {
  const json = req.body;

  const user = new User(json);

  const hasErrors = user.validateSync();

  return hasErrors
    ? res.status(400).json(hasErrors)
    : res.status(201).json(await user.save());
});


router.put("/:id", isAuthorized, (req,res)=>{

});

router.delete("/:id", isAuthorized, (req,res)=>{

});


module.exports = router;
