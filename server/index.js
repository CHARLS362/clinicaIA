const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./model/userModel');
const appointment_info = require('./model/appointmentCheck');
const { calcularHuecosLibres , buscarHorarioOptimo } = require('./a-estrella')

require('dotenv').config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());


// app.post('/dental-clinic/slot/', async (req, res) => {
//   try {
//     const user_date = await appointment_info.findOne({ date: req.body.date });
//     const user_time = await appointment_info.findOne({ time: req.body.time });

//     if (user_date) {
//       if (user_time) {
//         return res.status(401).json({ message: 'This slot is already Booked' });
//       }
//     }

//     const Appointment_info = new appointment_info({
//       date: req.body.date,
//       name: req.body.name,
//       email: req.body.email,
//       phone: req.body.phone,
//       time: req.body.time,
//     });

//     const userAppointment = await Appointment_info.save();
//     // -----||
//     if (userAppointment) {
//       console.log(req.body);
//       res.status(201).json({ message: 'successfully Make An Appointment' });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post('/dental-clinic/slot/', async (req, res) => {
  try {
    // Check if the slot is already booked
    const existingSlot = await appointment_info.findOne({
      date: req.body.date,
      time: req.body.time,
    });

    if (existingSlot) {
      return res.status(401).json({ message: 'This slot is already booked' });
    }

    // Create the new appointment
    const newAppointment = new appointment_info({
      date: req.body.date,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      time: req.body.time,
    });

    // Save the new appointment
    const savedAppointment = await newAppointment.save();

    if (savedAppointment) {
      console.log(req.body);
      return res
        .status(201)
        .json({ message: 'Successfully made an appointment' });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'An error occurred while processing your request' });
  }
});

app.post('/register', async (req, res) => {
  console.log(req.body);

  let saltRounds = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(401).json({ error: 'Email already Exist' });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: 'user registered successfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/login_user', async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.json({ msg: 'Incorrect Email or Password', status: false });

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid)
      return res.json({ msg: 'Incorrect Password', status: false });

    delete user.password;
    if (user && isPasswordValid) {
      return res.status(201).json({ message: 'Login Successfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/dental-clinic/user/profile', async (req, res) => {
  try {
    const Appointment_info = await appointment_info.find();
    res.send(Appointment_info);
  } catch (err) {
    console.log(err);
  }
});

app.get('/dental-clinic/admin-person', async (req, res) => {});

// app.use((req, res) => {
//   res.status(404).send('Page not Found');
// });

//A* Enpoints
app.post('/api/horario-optimo', async (req, res) => {
  try {
    console.log('Datos recibidos en /api/horario-optimo:', req.body);

    const { eventos, fechaInicio, fechaFin, duracionCita, preferencias } = req.body;
    if (!fechaInicio || !fechaFin || isNaN(Date.parse(fechaInicio)) || isNaN(Date.parse(fechaFin))) {
      return res.status(400).json({ error: "'fechaInicio' o 'fechaFin' inválidas" });
    }

    const horariosLibres = calcularHuecosLibres(eventos, new Date(fechaInicio), new Date(fechaFin));
    const horarioOptimo = buscarHorarioOptimo(horariosLibres, duracionCita, preferencias);

    res.json({ horarioOptimo });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al calcular horario óptimo' });
  }
});



app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
