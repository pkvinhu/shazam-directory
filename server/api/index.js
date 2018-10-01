const Sequelize = require('sequelize')
const express = require('express');
const router = express.Router();
const { School, Student, Teacher } = require('../db').models;

//GET ROUTES
router.get('/students', (req, res, next) => {
  Student.findAll({
  	include: [{
  	  model: Teacher,
  	  as: 'Teacher'
  	}]
  })
  .then(students => res.send(students))
  .catch(next)
})

router.get('/teachers', (req, res, next) => {
  Teacher.findAll({
  	include: [{
  	  model: Student,
  	  as: 'Student'
  	}]
  })
  .then(teachers => res.send(teachers))
  .catch(next)
})

router.get('/schools', (req, res, next) => {
  School.findAll({
  	  include: [{
  	  	model: Student,
  	  	as: 'Student'
  	  }, {
  	  	model: Teacher,
  	  	as: 'Faculty'
  	  }]
  })
  .then(schools => res.send(schools))
  .catch(next)
})

//GET BY :ID
router.get('/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
  .then(student => {
    if(!student) res.sendStatus(404)
  	else res.send(student)
  })
  .catch(next)
})

router.get('/teachers/:id', (req, res, next) => {
  Teacher.findById(req.params.id)
  .then(teacher => {
    if(!teacher) res.sendStatus(404)
  	else res.send(teacher)  	
  })
  .catch(next)
})

router.get('/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
  .then(school => {
    if(!school) res.sendStatus(404)
  	else res.send(school)  	
  })
  .catch(next)
})

// GET BY :NAME
router.post('/search/:filter', (req, res, next) => {
  const Op = Sequelize.Op;
  console.log(req.body)
  if(req.params.filter === 'students') {
  Student.findAll({
    where: {
      name: {
        [Op.like] : '%' + req.body.name + '%'
      }
    }     
  })
  .then(students => {
    res.send(students)
  })
  .catch(next)
  }

  else if (req.params.filter === 'teachers') {
    Teacher.findAll({
      where: {
        name: {
          [Op.like] : '%' + req.body.name + '%'
        }
      }
    })
    .then(teachers => {
      res.send(teachers)
    })
    .catch(next)
  }

  else if(req.params.filter === 'schools') {
    School.findAll({
      where: {
        name: {
          [Op.like] : '%' + req.body.name + '%'
        }
      }
    })
    .then(schools => res.send(schools))
    .catch(next)
  }
})

//CREATE
router.post('/students/create', (req, res, next) => {
  Student.create(req.body)
  .then(student => res.send(student))
  .catch(next)
})

router.post('/teachers/create', (req, res, next) => {
  Teacher.create(req.body)
  .then(teacher => res.send(teacher))
  .catch(next)
})

router.post('/schools/create', (req, res, next) => {
  School.create(req.body)
  .then(school => res.send(school))
  .catch(next)
})

//DELETE
router.delete('/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
  .then(student => {
  	student.destroy()
  	res.sendStatus(204).end()
  })
})

router.delete('/teachers/:id', (req, res, next) => {
  Teacher.findById(req.params.id)
  .then(teacher => {
  	teacher.destroy()
  	res.sendStatus(204).end()
  })
})

router.delete('/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
  .then(school => {
  	school.destroy()
  	res.sendStatus(204).end()
  })
})

module.exports = router;