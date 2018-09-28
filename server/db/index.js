const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false })

const Student = conn.define('student', {
  firstName: {
  	type: Sequelize.STRING,
  	allowNull: false,
  	validate: {
  	  notEmpty: true
  	}
  },
  lastName: {
  	type: Sequelize.STRING,
  	allowNull: false,
  	validate: {
  	  notEmpty: true
  	}
  },
  gpa: {
  	type: Sequelize.FLOAT,
  	validate: {
  	  isDecimal: true,
  	  isBetweenZeroAndFour(val) {
  	  	if (val < 0 || val > 4.0) {
  	  	  throw new Error('Invalid GPA!')
  	  	}
  	  }
  	}
  },
  extracurricular: Sequelize.ARRAY(Sequelize.STRING),
  admin: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: false
  }
}
// , {
//   hooks: {
//   	afterValidate(instance) {
//   	  instance.gpa = (instance.gpa).toFixed(2)
//   	}
//   }
)


const School = conn.define('school', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  address: Sequelize.STRING,
  description: Sequelize.TEXT
})


const Teacher = conn.define('teacher', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  subjects: Sequelize.ARRAY(Sequelize.STRING),
  admin: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: true
  }
})

const ClassRelations = conn.define('classRelations', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: Sequelize.INTEGER,
  teacherId: Sequelize.INTEGER
})

School.hasMany(Student, { as: 'Student'})
Student.belongsTo(School)

Teacher.belongsToMany(Student, { as: 'Student', through: 'classRelations' })
Student.belongsToMany(Teacher, { as: 'Teacher', through: 'classRelations' })

School.hasMany(Teacher, { as: 'Faculty' })
Teacher.belongsTo(School)

const syncAndSeed = () => {
  conn.sync({ force: true })
  .then(() => {
  	console.log('hello')
  })
}

module.exports = {
  syncAndSeed,
  models: { 
  	Student, 
  	School,
  	Teacher,
  	ClassRelations
  }
}