const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//@get all
router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

//@get by id
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

//@delete
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercises => res.json('Exercise Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//@put
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        console.log('insdie put');
        exercise.save()
        .then( () => res.json("Exercise Updated! "))
        .catch(err => res.status(400).json(`Error ${err}`));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//@post
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    })
    newExercise.save()
    .then(() => res.json('Exercise added'))
    .catch(err => res.status(400).json('Errors: ' + err));
});

module.exports = router;

