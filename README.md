# API for Kickstarter Success app.

API
https://kickstarter-success-api.herokuapp.com/

POST Register A New User
Endpoint /api/auth/register

Required in body:
username
password

{
username: 'username',
password: 'password'
}

returns the new user that was created

{
id: 1,
username: 'user'
}

POST Login
Endpoint /api/auth/login

Required in body:
username
password

{
username: 'username',
password: 'password'
}

returns a message, user data and JSON web token, include { 'authorization': 'Bearer <token>' } in request headers to access restricted endpoints

{
message: "Welcome to the api",
data: {
id: 1,
username: "test",
password: "$2a$10\$vwuAPuMM...Lqs80V8AVBFk53DhsOyl2"
},
token: "eyJhbGciOiJIUzI1NiIsIn...H1IBZbhw"
}
