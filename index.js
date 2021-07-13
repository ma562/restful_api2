require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

const Student = require('./models/preface student')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//getting all
app.get('/', async (req, res) => {
  try {
      const student = await Student.find()
      res.json(student)
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

//getting one
app.get('/:id', getStudent, (req, res) => {
  res.json(res.student)
})

//Creating one
app.post('/', async (req, res) => {
  const student = new Student({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender
  })
  try {
      const newStudent = await student.save()
      res.status(201).json(student)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})

//Updating one
app.patch('/:id', getStudent, async (req, res) => {
  if (req.body.name != null) {
      res.student.name = req.body.name
  }
  if (req.body.age != null) {
      res.student.age = req.body.age
  }
  if (req.body.gender != null) {
      res.student.gender = req.body.gender
  }
  try {
      const updatedStudent = await res.student.save()
      res.json(updatedStudent)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})

//deleting one
app.delete('/:id', getStudent, async (req, res) => {
  try {
      await res.student.remove()
      res.json({ message: 'Deleted Student'})
  } catch (err) {
      res.status(500).json({message: err.message })
  }
})

async function getStudent(req, res, next) {
  let student
  try {
      student = await Student.findById(req.params.id)
      if(student == null) {
          return res.status(404).json({ message: 'Cannot find student' })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }

  res.student = student
  next()
}


/*
app.get('/name/:myself/users/:userId/email/:the_email', function (req, res) {
    res.send('Welcome ' + req.params.myself + '! Your user ID is ' + req.params.userId + ' and your email is ' + req.params.the_email);
  })

app.post('/api/users', function(req, res) {
    const user_id2 = req.body.id;
    const name = "Billy";
    const user_id = 100;
    const token = 123;
    const email = "billy@preface.edu";

    var info = {
        'name' : name,
        'user_id': user_id2,
        'token': token,
        'email': email,
      }

    res.send(info);

  });
*/


app.listen(3000, 

    ()=>{
        console.log("listening to port 3000...")
}
)