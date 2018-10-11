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
  	},
    {
      model: School
    }],
    order:[
      ['name', 'DESC']
    ]
  })
  .then(students => {
    res.send(students)
  })
  .catch(next)
})

router.get('/teachers', (req, res, next) => {
  Teacher.findAll({
  	include: [{
  	  model: Student,
  	  as: 'Student'
  	},
    {
      model: School
    }],
    order:[
      ['name', 'DESC']
    ]
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
  	  }],
    order:[
      ['name', 'DESC']
    ]
  })
  .then(schools => res.send(schools))
  .catch(next)
})

//GET BY :ID
router.get('/students/:id', (req, res, next) => {
  Student.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Teacher,
      as: 'Teacher'
    },
    {
      model: School
    }]
  })
  .then(student => {
    if(!student) res.sendStatus(404)
  	else res.send(student)
  })
  .catch(next)
})

router.get('/teachers/:id', (req, res, next) => {
  Teacher.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Student,
      as: 'Student'
    },
    {
      model: School
    }]
  })
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
router.post('/students/create', async (req, res, next) => {
  try {
    const student = await Student.create(req.body)
    if(req.body.enrollment) {
      const school = await School.findById(req.body.enrollment)
      student.setSchool(school)
    }
    res.send(student)
  }
  catch(err) {next(err)}
})

router.post('/teachers/create', async (req, res, next) => {
  try {
    const teacher = await Teacher.create(req.body)
    if(req.body.employment) {
      const school = await School.findById(req.body.employment)
      teacher.setSchool(school)
    }
    res.send(teacher)
  }
  catch(err) {next(err)}
})

router.post('/schools/create', (req, res, next) => {
  School.create(req.body)
  .then(school => res.send(school))
  .catch(next)
})

// EDIT
router.put('/edit/:filter/:id', async (req, res, next) => {
  const id = req.params.id;

  if(req.params.filter === 'students'){
    try{
      const student = await Student.findById(id)
      const school = await School.findById(req.body.schoolId)
      const updated = await student.update({
                              name: req.body.name,
                              gpa: req.body.gpa,
                              extracurricular: req.body.extracurricular
                            })
      if(school){await updated.setSchool(school)}
      res.send(updated)
    }
    catch(err){next(err)}
  }

  if(req.params.filter === 'teachers'){
    try{
      const teacher = await Teacher.findById(id)
      const school = await School.findById(req.body.schoolId)
      const updated = await teacher.update({
                              name: req.body.name,
                              gender: req.body.gender,
                              subjects: req.body.subjects
                            })
      if(school){await updated.setSchool(school)}
      res.send(updated)
    }
    catch(err){next(err)}
  }

  if(req.params.filter === 'schools'){
    try{
      const school = await School.findById(id)
      const updated = await school.update({
                              name: req.body.name,
                              address: req.body.address,
                              description: req.body.description
                            })
      res.send(updated)
    }
    catch(err){next(err)}
  }
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