const attendanceSchema = new mongoose.Schema({
  teacherId: mongoose.Schema.Types.ObjectId,
  date: Date,
  status: { type: String, enum: ['present', 'absent', 'leave'] },
  course: String
});
module.exports = mongoose.model('Attendance', attendanceSchema);