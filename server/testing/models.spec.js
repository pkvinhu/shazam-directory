const Sequelize = require('sequelize');
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect;
const db = require('../db')
const { Student, Teacher, School, ClassRelations } = db.models;
chai.use(chaiAsPromised)

describe('Models', () => {

//STUDENT MODELS TESTS
  describe('Student model', () => {
  	beforeEach(() => {
  	  return db.syncAndSeed();
  	  });

  	it('name is required', async () => {
  	  await expect(Student.create({firstName: 'Moo', lastName: '', gpa: 3.0})).to.be.rejected;
  	  await expect(Student.create({lastName: 'Moo', gpa: 3.0})).to.be.rejected;
  	});
  	
  	it('name is string', async () => {
  	  const dude = await Student.create({firstName: 'Moo', lastName: 'Moo', gpa: 3.0})
  	  expect(typeof dude.firstName).to.equal('string')
  	  expect(typeof dude.lastName).to.equal('string')
  	});

  	it('gpa is a number', async () => {
  	  const whatta = await Student.create({firstName: 'Whatta', lastName: 'Foo', gpa: 3.0})
  	  expect(typeof whatta.gpa).to.equal('number')
  	});

  	it('gpa cannot be over under 0 or over 4', async () => {
  	  await expect(Student.create({ firstName: 'Larry', lastName:'Foo', gpa: 4.5})).to.be.rejected;
  	  await expect(Student.create({ firstName: 'Larry', lastName:'Foo', gpa: -1})).to.be.rejected;
  	});

  	it('extracurriculars are arrays of strings', async () => {
  	  await expect(Student.create({ firstName: 'Larry', lastName:'Foo', extracurricular: {1: 2} })).to.be.rejected;
  	  await expect(Student.create({ firstName: 'Barry', lastName:'Foo', extracurricular: 3})).to.be.rejected;

  	  const john = await Student.create({ firstName: 'Larry', lastName:'Foo', extracurricular: ['Math team', 'Basketball team']});
  	  expect(john.extracurricular).to.have.lengthOf(2);
  	});

  	it('admin field is set to false', async() => {
  	  const john = await Student.create({ firstName: 'Larry', lastName:'Foo'}); 
  	  expect(john.admin).to.equal(false); 	  
  	});
  });

//SCHOOL MODEL TESTS
   describe('School model', () => {
   	 beforeEach(() => {
       return db.syncAndSeed();
  	 });

  	// afterEach(() => {
  	//   return School.truncate();
  	// });

  	it('name is required', async () => {
  	  await expect(School.create()).to.be.rejected;
  	  await expect(School.create({description: 'very good description'})).to.be.rejected;
  	});

  	it('address is a string', async () => {
  	  await expect(School.create({name: 'Whitney', address: ['123 W. Barry']})).to.be.rejected;
  	});

  	it('description can be very long', async () => {
  	  const someSchool = await School.create({name: 'Walter Payton', description: 'Bacon ipsum dolor amet sausage ball tip kevin spare ribs tail, turkey jerky. Beef ball tip doner hamburger sausage andouille t-bone boudin fatback brisket tongue ground round kevin ham hock pastrami. Fatback tenderloin porchetta, sausage ball tip tongue swine chicken. Shoulder pork loin strip steak leberkas, alcatra t-bone kielbasa. Spare ribs shankle drumstick pork chop, ball tip ham hock turkey turducken tongue beef meatball kevin doner hamburger flank. Ham hock biltong turducken spare ribs, tail kielbasa rump hamburger beef ribs drumstick tenderloin boudin fatback jowl.'});
  	  expect(someSchool).to.be.ok;
  	});
   });

//TEACHER MODEL TESTS
  describe('Teacher model', () => {
  	beforeEach(() => {
  	  return db.syncAndSeed();
  	});

  	// afterEach(() => {
  	//   return Teacher.truncate();
  	// });

  	it('name is required', async () => {
  	  await expect(Teacher.create()).to.be.rejected;
  	  await expect(Teacher.create({subjects: ['Math', 'Science']})).to.be.rejected;
  	});

  	it('subjects are an array of strings', async () => {
  	  await expect(Teacher.create({name: 'Harrison Ford', subjects: {1: 'Math', 2: 'Science'}})).to.be.rejected;
  	  await expect(Teacher.create({name: 'Harrison Ford', subjects: 'Geography'})).to.be.rejected;  	  
   	  await expect(Teacher.create({name: 'Harrison Ford', subjects: [ Number(2), []] })).to.be.rejected;
  	});

  	it('teachers are automatically set to admin', async () => {
  	  const joeSchmoe = await Teacher.create({ name: 'Joe Schmoe'}); 
  	  expect(joeSchmoe.admin).to.equal(true);
  	});
  });

//RELATIONSHIPS
  describe('Relationships', () => {
  	beforeEach(() => {
  	  return db.syncAndSeed();
  	});

  it('school can have many students but students can only have one school', async () => {
  	const [moe, joe, USC, UCLA] = await Promise.all([
  	  Student.create({firstName: 'Moe', lastName: 'Wu', gpa: 3.0}),
      Student.create({firstName: 'Joe', lastName: 'Hu', gpa: 3.0}),
      School.create({name: 'USC'}),
      School.create({name: 'UCLA'})
  	]);
  	
  	moe.setSchool(USC)
  	joe.setSchool(UCLA)
  	
  	expect(moe.schoolId).to.equal(USC.id)
  	expect(joe.schoolId).to.equal(UCLA.id)
  });

  it('teachers can have many students, and vice versa', async () => {
  	const [Teacher1, Teacher2, julie, steph] = await Promise.all([
  	  Teacher.create({name: 'Mr. Howard'}),
  	  Teacher.create({name: 'Mrs. Davidson'}),
  	  Student.create({firstName: 'Julie', lastName: 'Kang', gpa: 3.7}),
      Student.create({firstName: 'Steph', lastName: 'Chang', gpa: 3.85}),
  	]);

  	await Teacher1.addStudent(julie)
  	await Teacher2.addStudent(julie)
  	await steph.setTeacher(Teacher1)

  	const relations = await ClassRelations.findAll()
  	expect(relations[0].teacherId).to.equal(Teacher1.id);
  	expect(relations[1].studentId).to.equal(julie.id);
  	expect(relations[2].studentId).to.equal(steph.id);  	
  });

  it('school can have many teachers but teachers only one school', async () => {
    const [Johnson, Lee, USC, UCLA] = await Promise.all([
  	  Teacher.create({name: 'Johnson'}),
      Teacher.create({name: 'Lee'}),
      School.create({name: 'USC'}),
      School.create({name: 'UCLA'})
  	]);

    Johnson.setSchool(USC);
    Lee.setSchool(UCLA);

    expect(Johnson.schoolId).to.equal(USC.id);
    expect(Lee.schoolId).to.equal(UCLA.id);
  });
  });
});