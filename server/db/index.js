const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false })
const faker = require('faker');

const Student = conn.define('student', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false,
  	validate: {
  	  notEmpty: true
  	}
  },
  img: {
    type: Sequelize.STRING,
    defaultValue: faker.image.people()
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
  extracurricular: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    get(){
      if(this.getDataValue('extracurricular') !== null) {
        return this.getDataValue('extracurricular').join(', ')
      }
    }
  },
  admin: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: false
  }
})


const School = conn.define('school', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: faker.address.streetAddress() + ' ' + faker.address.city() + ' ' + faker.address.zipCode()
  },
  img: {
    type: Sequelize.STRING,
    defaultValue: faker.image.nature()
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: faker.lorem.paragraph()
  }
})


const Teacher = conn.define('teacher', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    get(){
      return this.getDataValue('gender') === 'M' ?
      'Mr. ' + this.getDataValue('name').split(' ')[1] :
      'Mrs. ' + this.getDataValue('name').split(' ')[1]
    }
  },
  gender: {
    type: Sequelize.ENUM('M','F'),
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    defaultValue: faker.image.abstract()
  },
  subjects: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    // defaultValue: faker.random.words()
  },
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
  return conn.sync()
  // .then(() => {
  //   return Promise.all([
  //     Student.create({ name: 'Harry Problem', gpa: 3.85}),
  //     Student.create({ name: 'Tarry Choo', gpa: 3.85}),
  //     Student.create({ name: 'Nana Baba', gpa: 3.85}),
  //     Teacher.create({ name: 'Harry Thomas', gender: 'M', subjects: ['History', 'Anthropology']}),
  //     Teacher.create({ name: 'Barry Tomas', gender: 'M', subjects: ['Math', 'Accounting']}),
  //     Teacher.create({ name: 'Larry Roma', gender: 'M', subjects: ['Theology', 'Sociology']}),
  //     School.create({ name: 'ABCD'}),
  //     School.create({ name: 'EFGH'}),
  //   ])
  // })
  .then(() => {
    console.log('different')
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