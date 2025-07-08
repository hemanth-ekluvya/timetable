const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Set Mongoose strictQuery
mongoose.set('strictQuery', true);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Schemas
const userSchema = new mongoose.Schema({
  employee_id: String,
  name: String,
  email: String,
  password: String,
  role: String,
  school: String,
  professional_details: Object,
  resetToken: String,
  resetTokenExpiry: Date
});
const User = mongoose.model('User', userSchema);

const attendanceSchema = new mongoose.Schema({
  teacher_id: mongoose.Schema.Types.ObjectId,
  date: Date,
  status: String,
  course: String
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

const timetableSchema = new mongoose.Schema({
  class_id: mongoose.Schema.Types.ObjectId,
  section: String,
  date: Date,
  session_no: Number,
  room_no: String,
  subject: String,
  teacher_id: mongoose.Schema.Types.ObjectId,
  topic: String
});
const Timetable = mongoose.model('Timetable', timetableSchema);

const examTimetableSchema = new mongoose.Schema({
  class_id: mongoose.Schema.Types.ObjectId,
  date: Date,
  time: String,
  subject: String,
  paper_setter_id: mongoose.Schema.Types.ObjectId
});
const ExamTimetable = mongoose.model('ExamTimetable', examTimetableSchema);

const syllabusSchema = new mongoose.Schema({
  class_id: mongoose.Schema.Types.ObjectId,
  course: String,
  subjects: [{ name: String, topics: [String] }]
});
const Syllabus = mongoose.model('Syllabus', syllabusSchema);

const paperSetterSchema = new mongoose.Schema({
  setter_id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  subjects: [String]
});
const PaperSetter = mongoose.model('PaperSetter', paperSetterSchema);

const classSchema = new mongoose.Schema({
  class_id: mongoose.Schema.Types.ObjectId,
  course: String,
  section: String,
  name: String
});
const Class = mongoose.model('Class', classSchema);

const courseSchema = new mongoose.Schema({
  course_id: mongoose.Schema.Types.ObjectId,
  name: String
});
const Course = mongoose.model('Course', courseSchema);

const schoolSchema = new mongoose.Schema({
  name: String,
  logo: String,
  account_info: Object
});
const School = mongoose.model('School', schoolSchema);

const loginLogSchema = new mongoose.Schema({
  teacher_id: mongoose.Schema.Types.ObjectId,
  login_time: Date,
  logout_time: Date
});
const LoginLog = mongoose.model('LoginLog', loginLogSchema);

// Middleware for Authentication
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Authentication APIs
app.post('/auth/signup', async (req, res) => {
  const { employee_id, name, email, password, role, school } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ employee_id, name, email, password: hashedPassword, role, school });
  await user.save();
  res.status(201).json({ message: 'User created' });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

app.post('/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();
  res.json({ message: 'Reset token sent' });
});

app.post('/auth/reset-password', async (req, res) => {
  const { email, new_password, token } = req.body;
  const user = await User.findOne({ email, resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  user.password = await bcrypt.hash(new_password, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();
  res.json({ message: 'Password reset successful' });
});

// User Profile & Account APIs
app.get('/user/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

app.put('/user/profile', authMiddleware, async (req, res) => {
  const updates = req.body;
  await User.findByIdAndUpdate(req.user.id, updates);
  res.json({ message: 'Profile updated' });
});

app.put('/user/:id', authMiddleware, async (req, res) => {
  const { name, email, role, school } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.school = school || user.school;
    await user.save();
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/user/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/attendance/teachers', authMiddleware, async (req, res) => {
  const { week, month, course } = req.query;
  const query = {};
  if (course) query.course = course;
  if (week) query.date = { $gte: new Date(week), $lte: new Date(new Date(week).setDate(new Date(week).getDate() + 7)) };
  if (month) query.date = { $gte: new Date(month), $lte: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)) };
  const attendance = await Attendance.find(query);
  res.json(attendance);
});

app.get('/attendance/teacher/:id', authMiddleware, async (req, res) => {
  const attendance = await Attendance.find({ teacher_id: req.params.id });
  res.json(attendance);
});

app.post('/timetable', authMiddleware, async (req, res) => {
  const { class_id, section, date, session_no, room_no, subject, teacher_id, topic } = req.body;
  try {
    const timetable = new Timetable({
      class_id,
      section,
      date: new Date(date),
      session_no,
      room_no,
      subject,
      teacher_id,
      topic
    });
    await timetable.save();
    res.status(201).json({ message: 'Timetable entry created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/timetable/class/:class_id', authMiddleware, async (req, res) => {
  const { date, section } = req.query;
  const query = { class_id: req.params.class_id };
  if (date) query.date = new Date(date);
  if (section) query.section = section;
  const timetable = await Timetable.find(query).populate('teacher_id', 'name');
  res.json(timetable);
});

app.get('/timetable/day', authMiddleware, async (req, res) => {
  const { date } = req.query;
  const timetable = await Timetable.find({ date: new Date(date) });
  res.json(timetable);
});

app.get('/timetable/all', authMiddleware, async (req, res) => {
  const timetable = await Timetable.find().populate('teacher_id', 'name').populate('class_id', 'name');
  res.json(timetable);
});

app.put('/timetable/:id', authMiddleware, async (req, res) => {
  const { class_id, section, date, session_no, room_no, subject, teacher_id, topic } = req.body;
  try {
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) return res.status(404).json({ message: 'Timetable entry not found' });
    timetable.class_id = class_id || timetable.class_id;
    timetable.section = section || timetable.section;
    timetable.date = date ? new Date(date) : timetable.date;
    timetable.session_no = session_no || timetable.session_no;
    timetable.room_no = room_no || timetable.room_no;
    timetable.subject = subject || timetable.subject;
    timetable.teacher_id = teacher_id || timetable.teacher_id;
    timetable.topic = topic || timetable.topic;
    await timetable.save();
    res.json({ message: 'Timetable entry updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/timetable/:id', authMiddleware, async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetable) return res.status(404).json({ message: 'Timetable entry not found' });
    res.json({ message: 'Timetable entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/timetable/syllabus/:class_id', authMiddleware, async (req, res) => {
  const syllabus = await Syllabus.find({ class_id: req.params.class_id });
  res.json(syllabus);
});

app.post('/exam-timetable', authMiddleware, async (req, res) => {
  const { class_id, date, time, subject, paper_setter_id } = req.body;
  try {
    const examTimetable = new ExamTimetable({
      class_id,
      date: new Date(date),
      time,
      subject,
      paper_setter_id
    });
    await examTimetable.save();
    res.status(201).json({ message: 'Exam timetable entry created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/exam-timetable/:class_id', authMiddleware, async (req, res) => {
  const { date } = req.query;
  const query = { class_id: req.params.class_id };
  if (date) query.date = new Date(date);
  const examTimetable = await ExamTimetable.find(query).populate('paper_setter_id', 'name');
  res.json(examTimetable);
});

// Paper Setter Team APIs
app.get('/papersetters', authMiddleware, async (req, res) => {
  const setters = await PaperSetter.find();
  res.json(setters);
});

app.get('/papersetters/:id', authMiddleware, async (req, res) => {
  const setter = await PaperSetter.findById(req.params.id);
  res.json(setter);
});

// Teacher Dashboard APIs
app.get('/teachers', authMiddleware, async (req, res) => {
  const teachers = await User.find({ role: 'teacher' }).select('-password');
  res.json(teachers);
});

app.get('/teacher/login-log', authMiddleware, async (req, res) => {
  const logs = await LoginLog.find({ teacher_id: req.user.id });
  res.json(logs);
});

app.get('/teacher/timetable', authMiddleware, async (req, res) => {
  const { date } = req.query;
  const query = { teacher_id: req.user.id };
  if (date) query.date = new Date(date);
  const timetable = await Timetable.find(query).populate('class_id', 'name');
  res.json(timetable);
});

app.get('/teacher/allotted-classes', authMiddleware, async (req, res) => {
  const classes = await Timetable.find({ teacher_id: req.user.id }).distinct('class_id');
  res.json(classes);
});

// Utility/Navigation APIs
app.get('/classes', authMiddleware, async (req, res) => {
  const classes = await Class.find();
  res.json(classes);
});

app.get('/courses', authMiddleware, async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Miscellaneous APIs
app.get('/school/details', authMiddleware, async (req, res) => {
  const school = await School.findOne();
  res.json(school);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));