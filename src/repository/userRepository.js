const { User } = require('../models/index');

class UserRepository{

    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw error;
           
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes : ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getUserByEmail(userEmail){
        try {
            const user = await User.findOne({
                where : {
                    email : userEmail
                }
            });
            if(!user){
                // throw new ClientError(
                //     'AttributeNotFound',
                //     'Invalid email sent in the request',
                //     'Please check email, as there is no record of the email',
                //     StatusCodes.NOT_FOUND
                // )
                console.log("user with given email not found");
                throw new error(
                    "user not found"
                )
            }
            return user;
        } catch (error) {
           
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository