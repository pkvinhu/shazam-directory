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
      const name = this.getDataValue('name').split(' ');
      return this.getDataValue('gender') === 'M' ?
      'Mr. ' + name[name.length-1] :
      'Ms. ' + name[name.length-1]
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
    get(){
      if(this.getDataValue('subjects') !== null) {
        return this.getDataValue('subjects').join(', ')
      }
    }
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