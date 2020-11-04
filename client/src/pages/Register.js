import gql from "graphql-tag";
import React, { useState } from "react";
import {useMutation} from '@apollo/react-hooks';
import { Button, Form } from "semantic-ui-react";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (Event) => {
      setValues({ ...values, [Event.target.name]: Event.target.value});
  }

  const [addUser, {loading}] = useMutation(REGISTER_USER, {
    update(proxy, result){
        console.log(result)
    },
    variables: values
})

  const onSubmit = (Event) => {
      Event.preventDefault();
      addUser()
  };


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
){
    register(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ){
        id email username createdAt token
    }
}
`
export default Register;
