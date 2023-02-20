import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    complaintId: {
    type: String,
    required: true,
  },

  complaint: {
    department: {
      type: String,
      required: true,
    },
    complaintName: {
      type: String,
      required: true,
    },
  },

  description: {
    type: String,
    trim: true,
  },

  address: {
    type: String,
    default: "unavailable",
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// that method apply on  every single user

// complaintSchema.methods.toJSON = function () {
//   const complaint = this;
//   const complaintObject = complaint.toObject();

//   delete complaintObject._id;
//   delete complaintObject.__v;

//   return complaintObject;
// };

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
