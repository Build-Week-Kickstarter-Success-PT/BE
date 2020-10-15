## API for Kickstarter Success app.

[Kickstarter Success API](https://kickstarter-success-api.herokuapp.com/)

### Users Schema

```
{
    id: integer,
    name: string,
    email: string
    password: string,
}
```

### Campaign Schema

```
{
    id: integer,
    campaign_name: string,
    goal: decimal,
    description: string,
    campaign_date: dateTime,
    category": string,
}
```

### POST Register

**Endpoint - /api/auth/register**

> Required in body: name, email & password

```
{
    name: 'name',
    email: 'username@email.com'
    password: 'password'

}
```

**Status 201 - Success**

> Returns the new user that was created

```
{
    data: [
        {
            id: 1,
            name: 'name',
            email: 'username@email.com'
            password: '$2a$10$i5x...39kZDV/UZRqhu'
        }
    ],
}
```

**Status 400 - Bad Request**

> If email exists

```
{
    message: 'user already exists, please log in!'
}
```

If email or password is missing

```
{
    'apiCode': 400,
    'apiMessage': 'username or password missing'
}
```

### POST Login

**Endpoint - /api/auth/login**

> Required in body: email & password

```
{
    email: 'username@email.com',
    password: 'password'
}
```

**Status 200 - Success**

> Returns a message, user data and JSON web token.
> Include { 'authorization': 'Bearer <token>' } in request headers to access restricted endpoints

```
{
    message: 'Welcome to the api',
    data: {
        id: 1,
        name: 'name',
        email: 'user@email.com'
        password: '$2a$10$i5x...39kZDV/UZRqhu'
    },
    token: 'eyJhbGciOi...jfEkQoOGJgTkg'
}
```

**Status 400 - Bad Request**

> If email or password missing

```
{
    'apiCode': 400,
    'apiMessage': "username or password invalid"
}
```
