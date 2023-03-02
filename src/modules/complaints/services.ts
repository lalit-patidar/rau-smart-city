import ComplaintModel from "./model";
import { generateRandomid } from "../../utils/generate-radom-id";
import User from "../users/user-model";
import { getFromS3, uploadToS3 } from "../../utils/aws-s3/interact-with-s3";

class ComplaintService {
  async postCompalint({ newComplaint, user, postImage }: any) {
    try {
      // const myComplaint = {
      //     complaintId: generateRandomid(8).id,
      //     ...newComplaint,
      //     owner: user._id
      // }
      // const complaint = new ComplaintModel(myComplaint);
      // await complaint.save();
      console.log(newComplaint, "this is new com");
      const res = await uploadToS3("rau-smart-city", postImage, "one1");
      console.log(res, "res s3");

      return { message: "Compalint created successfully" };
    } catch (error) {
      throw error;
    }
  }

  async getCompalint({ user, limit, skip }: any) {
    try {
      const resStream = getFromS3("rau-smart-city", "one1");
      //  await user.populate('complaints')
      // console.log(user, res,  'this is user.../');
      // resStream.pipe(res)
    //    resStream.then((res) => console.log(res, "res123"));
      return resStream
    } catch (error) {
      throw error;
    }
  }
}
export const complaintInstance = new ComplaintService();
