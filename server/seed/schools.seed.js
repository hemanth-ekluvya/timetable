const { Types } = require("mongoose");
const ObjectId  = Types.ObjectId;

module.exports = [
    /* Schools */
  {
    _id: ObjectId("64f1aa000000000000000010"),
    name: "SR Digi School",
    address: "123 Main St, City, Country",
  },
  {
    _id: ObjectId("64f1aa000000000000000020"),
    name: "SR Prime School",
    address: "456 Elm St, City, Country",
  },
]