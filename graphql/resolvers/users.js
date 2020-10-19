const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const { ValidateRegisterInput, validateRegisterInput } = require('../../util/validators')
const {SECRET_KEY} = require('../../config');
const User = require("../../models/User");

module.exports = {
  Mutation: {
    //Here I put underscore instead of 'parent'<- it used when we have multiple resolvers
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
        const{ valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
        if(!valid){
            throw new UserInputError('Error', {errors})
        }
      // Make sure user doesn't already exist
      const user = await User.findOne({username});
      if(user){
          throw new UserInputError('Username is taken', {
              errors:{
                  username: 'This username is taken'
              }
          })
      }
      // hash password and create an auth token
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            username,
            password,
            createdAt: new Date().toISOString()
        });

        const res = await newUser.save();

        const token = jwt.sign({
            id: res.id,
            email: res.email,
            username: res.username
        }, SECRET_KEY, { expiresIn: '1h'});

        return {
            ...res._doc,
            id: res._id,
            token
        }
    }
  }
};