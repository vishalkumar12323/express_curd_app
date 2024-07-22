# Express-curd-application -:

## Application Local Usage and Installation -:

### Installation

Clone the repository using the following command -:

```bash
git clone https://github.com/vishalkumar12323/express_curd_app
```

Install required packages -:

```base
npm install
```

Run the application -:

```base
npm run dev
```

## Api documentation -:

### POST create-user -:

#### URL - http://localhost:3000/create-user

```text
Create User
The create-user endpoint is used to create a new user.
Request Body
name (string, required): The name of the user.
age (number, required): The age of the user.

Response
The response of this request is a JSON schema representing the structure of the response data.
```

#### Body

```json
{
    "name": "string",
    "age": number
}
```

<hr/>

### GET get-all-users -:

#### URL - http://localhost:3000/users

```text
Get Users
This endpoint sends an HTTP GET request to retrieve a list of users.
Request Body
This request does not require a request body.


Response Body
The response returns a JSON array containing user objects with the following schema:
Each user object includes an "id" representing the user's ID,a "name" representing the user's name
and an "age" representing the user's age.

```

#### JSON Response

```json
{
  "id": 0,
  "name": "",
  "age": 0
}
```

<hr/>

### GET get-single-user-with-id -:

#### URL - http://localhost:3000/user/id

```text
The endpoint retrieves user information based on the provided user ID.
Response
The response returns a JSON object with the following schema:
```

#### JSON Response

```json
"user": {
   "id": "number",
   "name": "string",
   "age": "number"
}
```

<hr/>

### PATCH update-user -:

#### URL - http://localhost:3000/update/id

```text
Update User Details

This endpoint is used to update user details by sending an HTTP PATCH request to the specified URL.
Request Body
The request body should be in raw format with a JSON payload containing the user's name and age.
```

#### Body

```json
{
  "name": "string",
  "age": number
}
```

<hr/>

### DELETE delete-user -:

#### URL - http://localhost:3000/delete/id

```text
Update User Details

This endpoint sends an HTTP DELETE request to the specified URL to delete the resource with ID 15.
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
