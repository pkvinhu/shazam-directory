
const supertest = require('supertest-as-promised')(require('../index'))
const expect = require('chai').expect;
const db = require('../db')
const { Student, Teacher, School, ClassRelations } = db.models;
const app = require('../index');

describe('Routes', () => {

  describe('Student routes', () => {
  	
  	beforeEach(() => {
      return db.syncAndSeed();
  	});

  describe('/api/shazam/students', () => {

  	 it('/GET responds with 200 and all students', async () => {
  	 	const students = await Promise.all([
  	     Student.create({ firstName: 'Perry', lastName: 'Chu', gpa: 4.0}),
  	     Student.create({ firstName: 'Sam', lastName: 'Wellander', gpa: 3.8}),
  	     Student.create({ firstName: 'Leo', lastName: 'Fernandez', gpa: 3.7})
  	    ]);
  	 	await supertest
  	 	.get('/api/shazam/students')
  	 	.expect(200)
  	 	.expect('Content-Type', /json/)
  	 	.expect(res => {
  	 	  expect(res.body).to.have.lengthOf(3);
  	 	});
  	 });
  });

  describe('/api/shazam/students/:id', () => {

  	 it('/GET responds with 200 and specific student per id', async () => {
	   const students = await Promise.all([
	     Student.create({ firstName: 'Harry', lastName: 'Lu', gpa: 4.0}),
	     Student.create({ firstName: 'Ham', lastName: 'Pellander', gpa: 3.8}),
	     Student.create({ firstName: 'Rio', lastName: 'DeJaniero', gpa: 3.7})
	   ]);
	   await supertest
	   .get(`/api/shazam/students/1`)
	   .expect(200)
	   .expect('Content-Type', /json/)
	   .expect(res => {
	   	 expect(res.body.firstName).to.equal('Harry')
	   });
	 });


	 it('returns 404 if id does not exist', async () => {
	   await supertest
	   .get('/api/shazam/students/10')
	   .expect(404);
	 });

  });

  describe('/DELETE /api/shazam/students/:id', () => {
  	
  	beforeEach(() => {
      return db.syncAndSeed();
  	});

  	it('responds with 204', async () => {
	   const students = await Promise.all([
	     Student.create({ firstName: 'Carry', lastName: 'Pu', gpa: 4.0}),
	     Student.create({ firstName: 'Vam', lastName: 'Vellander', gpa: 3.8}),
	     Student.create({ firstName: 'Tio', lastName: 'Tia', gpa: 3.7})
	   ]);
	   await supertest
	   .delete('/api/shazam/students/1')
	   expect(204)
	   // .get('/api/shazam/students')
	   // .expect(res => {
	   // 	 expect(res.data).to.have.lengthOf(5);
	   // });
	 });
  });
  });

  describe('Teacher Routes', () => {

    beforeEach(() => {
      return db.syncAndSeed();
	  });

    describe('/GET /api/shazam/teachers', () => {

      it('returns all teachers', async () => {
        const teachers = await Promise.all([
      	  Teacher.create({ name: 'Mr. Poo'}),
      	  Teacher.create({ name: 'Mrs. Loo'}),
      	  Teacher.create({ name: 'Mrs. RooRoo'})
        ]);
        await supertest
        .get('/api/shazam/teachers')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
      	  expect(res.body).to.have.lengthOf(3);
        });
      });
    });

    describe('/GET /api/shazam/teachers/:id', () => {

       it('return teacher by :id', async () => {
       	 const teachers = await Promise.all([
      	   Teacher.create({ name: 'Mr. Poo'}),
      	   Teacher.create({ name: 'Mrs. Loo'}),
      	   Teacher.create({ name: 'Mrs. RooRoo'})
         ]);
         await supertest
         .get('/api/shazam/teachers/1')
         .expect(200)
         .expect('Content-Type', /json/)
         .expect(res => {
           expect(res.body.name).to.equal(teachers[0].name);
         });
       });
    });

    describe('/DELETE /api/shazam/teachers/:id', () => {

      it('returns 204 and teacher is removed', async () => {
      	 const teachers = await Promise.all([
      	   Teacher.create({ name: 'Mr. Doo'}),
      	   Teacher.create({ name: 'Mrs. Koo'}),
      	   Teacher.create({ name: 'Mrs. HooHoo'})
         ]);
         await supertest
         .delete('/api/shazam/teachers/1')
         .expect(204)
      });
    });
  });

  describe('School Routes', () => {
  	 
  	 beforeEach(() => {
      return db.syncAndSeed();
  	 });

  	 describe('/GET /api/shazam/schools', () => {

  	 	it('gets all schools', async () => {
  	 	  const [ chuchie, something, school1, school2, school3 ] = await Promise.all([
  	 	  	Student.create({firstName: 'Chuchie', lastName: 'Serrano', gpa: '2.0'}),
  	 	  	Teacher.create({ name: 'Something', subjects: ['Math', 'History'] }),
  	 	  	School.create({ name: 'Northwestern' }),
  	 	  	School.create({ name: 'Northeastern' }),
  	 	  	School.create({ name: 'Southwestern' })
  	 	  ]);
  	 	  await chuchie.setSchool(school1);
  	 	  await something.setSchool(school1);
  	 	  await school1.setStudent(chuchie);
  	 	  await school1.setStudent(something);
  	 	  await supertest
  	 	  .get('/api/shazam/schools')
  	 	  .expect(200)
  	 	  .expect('Content-Type', /json/)
  	 	  .expect(res => {
  	 	  	expect(res.body).to.have.lengthOf(3);
  	 	  	// expect(res.body[0].students[0]).to.equal(chuchie)
  	 	  })
  	 	});
  	 });
  });
});