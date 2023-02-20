import UserModel from "./user-model";
import Axios from "axios";

class UserCreadentialServices {
    async createUser(newUserData: any) {
        try {
            const user = new UserModel(newUserData);
            await user.save();
            const { data } = await Axios.get(
                `https://2factor.in/API/V1/12d0d3c0-0f9d-11ec-a13b-0200cd936042/SMS/+91${newUserData.phoneNumber}/AUTOGEN`
              );
            //@ts-ignore
            const token = await user.generateAuthToken();
            console.log('token1', token)
            return {sessionId: data.Details, token}
        } catch (error) {
              throw error;
        }
    };

    async confirmUser(body: any, user: any, type: any) {
        
        if(!user) throw new Error('user not found');
        try {
            console.log("helloo", body, user, type);
            const { data } = await Axios.get(
              `https://2factor.in/API/V1/12d0d3c0-0f9d-11ec-a13b-0200cd936042/SMS/VERIFY/${body.sessionId}/${body.confirmCode}`
            );
            if(data.Status !== 'Success') throw Error('Wrong otp');
            if(type === 'signup') {
                user.registrationConfirmed = true;
                await user.save();
            }

            const token = await user.generateAuthToken(); // second token may be permanent token
             return {user, token}
          } catch (error: any) {
            throw error;
          }
    };

    async loginUser(validatedBody: any) {
        try {
            //@ts-ignore
            const {user, data} = await UserModel.findByCreadentials(validatedBody.phoneNumber);
            const token = await user.generateAuthToken();
            return { sessionId: data.Details, token };
        } catch (error) {
            console.log(error, "this is error");
           throw error
        }
    };

    async updateUser(updateBody: any, user: any) {
        try {
            if (!user) throw new Error("user not found..");

            for (let fileds in updateBody) {
                user[fileds] = updateBody[fileds];
            };

           const updatedUser =  await user.save();
            return updatedUser;
        } catch (error) {
            throw error;
        }
    };

    async logoutUser (user: any, existingToken: any) {
        try {
          user.tokens = user.tokens.filter((token: any) => token.token !== existingToken);
          await user.save();
            return 
        } catch (error) {
            throw error
        }
    };
}

export const UserCreadentialServicesInstance = new UserCreadentialServices();