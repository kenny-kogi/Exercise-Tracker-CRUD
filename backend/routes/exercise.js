import express from "express";
import Exercise from "../models/exercise.models";

const router = express.Router();

//GET endpoint
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error" + err));
});

//POST endpoint
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

//GET by ID Endpoint
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error" + err));
});

//DELETE endpoint
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error" + err));
});

//Update By id Endpoint
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.is)
    .then((exercise) => {
      if (!exercise) return res.status(404).send("no data");

      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise Updated"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
