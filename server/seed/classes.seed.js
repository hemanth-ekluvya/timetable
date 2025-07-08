const { Types } = require("mongoose");
const ObjectId  = Types.ObjectId;

module.exports = [
  /* classes (class => 10A, 9B, …) */
  {
    _id: ObjectId("64f1aa00000000000000010a"),
    name: "10A",
    schoolId: [
      ObjectId("64f1aa000000000000000010"),
      ObjectId("64f1aa000000000000000020"),
    ],
    teacherIds: [
      ObjectId("64f1aa110001110000000011"), // Naveen (Physics)
      ObjectId("64f1aa110001110000000012"), // Murali (Maths)
      ObjectId("64f1aa110001110000000013"), // Sravan (Chemistry)
    ],
  },
  {
    _id: ObjectId("64f1aa00000000000000010b"),
    name: "10B",
    schoolId: [
      ObjectId("64f1aa000000000000000010"),
      ObjectId("64f1aa000000000000000020"),
    ],
    teacherIds: [
      ObjectId("64f1aa110001110000000011"), // Naveen (Physics)
      ObjectId("64f1aa110001110000000012"), // Murali (Maths)
    ],
  },
  {
    _id: ObjectId("64f1aa00000000000000010c"),
    name: "10C",
    schoolId: [
      ObjectId("64f1aa000000000000000010"),
      ObjectId("64f1aa000000000000000020"),
    ],
    teacherIds: [
      ObjectId("64f1aa110001110000000016"), // SKR (Maths)
      ObjectId("64f1aa110001110000000017"), // Nagaraju (Physics)
      ObjectId("64f1aa110001110000000018"), // Naresh (Maths)
    ],
  },
  {
    _id: ObjectId("64f1aa00000000000000009a"),
    name: "9A",
    schoolId: [
      ObjectId("64f1aa000000000000000010"),
      ObjectId("64f1aa000000000000000020"),
    ],
    teacherIds: [
      ObjectId("64f1aa110001110000000014"), // Phani (Physics)
      ObjectId("64f1aa110001110000000015"), // SNB (Chemistry)
    ],
  },
  {
    _id: ObjectId("64f1aa00000000000000009b"),
    name: "9B",
    schoolId: [
      ObjectId("64f1aa000000000000000010"),
      ObjectId("64f1aa000000000000000020"),
    ],
    teacherIds: [
      ObjectId("64f1aa110001110000000014"), // Phani (Physics)
      ObjectId("64f1aa110001110000000015"), // SNB (Chemistry)
      ObjectId("64f1aa110001110000000019"), // Meeravali (Chemistry)
    ],
  },
  {
    _id: ObjectId("64f1aa00000000000000009c"),
    name: "9C",
    schoolId: [
      ObjectId("64f1aa000000000000000010"),
      ObjectId("64f1aa000000000000000020"),
    ],
    teacherIds: [
      ObjectId("64f1aa110001110000000017"), // Nagaraju (Physics)
      ObjectId("64f1aa110001110000000018"), // Naresh (Maths)
    ],
  },
  {
    _id: ObjectId("64f1aa00000000000000008a"),
    name: "8A",
    schoolId: [
      ObjectId("64f1aa000000000000000010"),
      ObjectId("64f1aa000000000000000020"),
    ],
    teacherIds: [
      ObjectId("64f1aa110001110000000016"), // SKR (Maths)
      ObjectId("64f1aa110001110000000019"), // Meeravali (Chemistry)
    ],
  },
  {
    _id: ObjectId("64f1aa00000000000000008b"),
    name: "8B",
    schoolId: [
      ObjectId("64f1aa000000000000000010"),
      ObjectId("64f1aa000000000000000020"),
    ],
    teacherIds: [
      ObjectId("64f1aa110001110000000016"), // SKR (Maths)
      ObjectId("64f1aa110001110000000017"), // Nagaraju (Physics)
      ObjectId("64f1aa110001110000000018"), // Naresh (Maths)
    ],
  },
  {
    _id: ObjectId("64f1aa00000000000000008c"),
    name: "8C",
    schoolId: [
      ObjectId("64f1aa000000000000000010"),
      ObjectId("64f1aa000000000000000020"),
    ],
    teacherIds: [
      ObjectId("64f1aa110001110000000014"), // Phani (Physics)
      ObjectId("64f1aa110001110000000015"), // SNB (Chemistry)
      ObjectId("64f1aa110001110000000019"), // Meeravali (Chemistry)
    ],
  },
  
];
