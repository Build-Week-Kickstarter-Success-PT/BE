## API for Kickstarter Success app.

[Kickstarter Success API](https://kickstarter-success-api.herokuapp.com/)

### POST Register

**Endpoint - /api/auth/register**

```
Required in body: username & password

{
    username: 'username',
    password: 'password'
}
```

```
Returns the new user that was created

{
    id: 1,
    username: 'username'
}
```

### POST Login

**Endpoint - /api/auth/login**

```
Required in body: username & password

{
    username: 'username',
    password: 'password'
}
```

```
Returns a message, user data and JSON web token.
Include { 'authorization': 'Bearer <token>' } in request headers
to access restricted endpoints

{
    message: "Welcome to the api",
    data: {
        id: 1,
        username: "username",
        password: "$2a$10\$vwuAPuMM...Lqs80V8AVBFk53DhsOyl2"
    },
    token: "eyJhbGciOiJIUzI1NiIsIn...H1IBZbhw"
}
```
