import ComplaintModel from "./model";
import { generateRandomid } from "../../utils/generate-radom-id";
import User from "../users/user-model"


class ComplaintService {
    async postCompalint({newComplaint, user}: any) {
        try {
            const myComplaint = {
                complaintId: generateRandomid(8).id,
                ...newComplaint,
                owner: user._id
            }
            const complaint = new ComplaintModel(myComplaint);
            await complaint.save();
            return {message: 'Compalint created successfully', complaintId: complaint.complaintId}
        } catch (error) {
              throw error;
        }
    };

    async getCompalint({user, limit, skip}: any) {
        try {
             await user.populate('complaints')
            console.log(user, 'this is user.../');
            return {user}
        } catch (error) {
              throw error;
        }
    };


}
export const complaintInstance = new ComplaintService();