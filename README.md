## API for Kickstarter Success app.

[Kickstarter Success API](https://kickstarter-success-api.herokuapp.com/)

### Users Schema

```
{
    id: integer,
    name: string,
    email: string
    password: string
}
```

### Campaign Schema

```
[
    {
        campaign_id: integer,
        campaign_name: string,
        goal: decimal,
        description: string,
        campaign_length: integer,
        category: string,
        sub_category: string,
        country: string
    }
]
```

### Prediction Schema

```
{
    goal: decimal,
    campaign_length: integer,
    category: string
    sub_category: string,
    country: string
}
```

### User Account

#### POST Register

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
    auth: {
        {
            id: 1,
            name: 'name',
            email: 'username@email.com'
        }
    }
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

#### POST Login

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
    auth: {
        id: 1,
        name: 'name',
        email: 'user@email.com'
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

### Campaigns

#### GET

**Endpoint - /api/users/:id/campaigns - Restricted**

**Status 200 - Success**

> Returns an array of campaigns

```
[
    {
        campaign_id: 1,
        campaign_name: Sample Campaign Name,
        goal: 10000,
        description: Sample description,
        campaign_length: 20,
        category: Sample Category,
        sub_category: Sample Sub Category,
        country: Sample Country,
        user_id: 1

    }
]
```

#### POST

**Endpoint - /api/users/:id/campaigns - Restricted**

> Required in body: campaign_name, goal, description, campaign_length, category, sub category, and country

```
{
    campaign_name: Sample Campaign Name,
    goal: 10000,
    description: Sample description,
    campaign_length: 20,
    category: Sample Category
    sub_category: Sample Sub Category,
    country: Sample Country
}
```

**Status 200 - Success**

> Return the new campaign that was created

```
{
    campaign_id: 1,
    campaign_name: Sample Campaign Name,
    goal: 10000,
    description: Sample description,
    campaign_length: 20,
    category: Sample Category,
    sub_category: Sample Sub Category,
    country: Sample Country,
    user_id: 1

}
```

**Status 400 - Bad Request**

> If the user does not have any campaigns

```
{
    apiCode: 400,
    apiMessage:  'missing campaign fields'
}
```

#### PUT

**Endpoint - /api/users/:id/campaigns/:campaign_id - Restricted**

**Status 200 - Success**

> Returns the updated campaign with given campaign_id

```
{
    updatedCampaign: {
        campaign_id: 1,
        campaign_name: Sample Campaign Name,
        goal: 10000,
        description: Sample description,
        campaign_length: 20,
        category: Sample Category,
        sub_category: Sample Sub Category,
        country: Sample Country,
        user_id: 1
    },
    message: 'campaign updated'
}
```

#### DELETE

**Endpoint - /api/users/:id/campaigns/:campaign_id - Restricted**

**Status 200 - Success**

> Deletes the campaign with the given campaign_id (If the user has more than one campaign it will delete the campaign with the given campaign_id and returns an array of the remainder campaigns)

```
{
    campaigns: []
    message: 'campaign deleted'
}
```

### Predictions

#### POST

**Endpoint - /api/users/:id/campaigns/:campaign_id/prediction - Restricted**

> Required in body: goal, campaign_length, category, sub category, and country

```
{
    goal: 10000,
    campaign_length: 20,
    category: Sample Category
    sub_category: Sample Sub Category,
    country: Sample Country
}
```

**Status 200 - Success**

> Returns a prediction of either 0 or 1 to determine success

```
{
    prediction: 0
}
```
