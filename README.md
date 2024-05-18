# Task-manager api

 ## The steps for this app are :
1. Create an account
2. Log in to an existing accout
3. Start to create tasks, modify their status, delete them / add a profile picture
4. Logout
5. Delete account

### Let's break it down:

When you create an account, **email** and **password** are *required*;Once you created the account, you will have to **Login** in order to use the other features(a token will be created too for tracking the user tasks)
The **auth** middleware will check if someone is connected or not ; beeing passed at all routers from **tasks** and from **users** (exept for create and login)

## Using the .get() method You can read all of your tasks, or only a specific one by its **ID** or read the profile

### .get('./users/me') - Will give information about the account<br><br>

### .get('/users/:id/avatar') Will show the profile picture<br><br>

### .get('/tasks/:id') Will how the informations about a specific task<br><br>

### .get('/tasks/...') Will sort the tasks depending on how you want them (I let the code flexible for this) As an example : Ascendint - Descending<br><br>


## Using the .(post) method You can create an account, login and logout
### .post('/users') Is used to create a user<br><br>
**The format for creating a user**
{
    "name": "TestUser",
    "email": "test@gmail.com",
    "password": "1qazwsxedc"
}<br><br>

**And here is the result in the console**

{
    "user": {
        "name": "TestUser",
        "email": "test@gmail.com",
        "age": 0,
        "_id": "6648e321eff3976f06af1b22",
        "createdAt": "2024-05-18T17:19:29.580Z",
        "updatedAt": "2024-05-18T17:19:29.601Z",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ4ZTMyMWVmZjM5NzZmMDZhZjFiMjIiLCJpYXQiOjE3MTYwNTI3Njl9.wZ-qrvs2vNQXPs_IXBebIJFmdrnkjfaNFBH0dcUIsyI"
}<br>
### As you can see, the password doesnt show, and the age is set to 0. Also,you can see when the user was created<br><br><br>

### .post('/users/login') Will verify if the email or password are a match for a user that HAS BEEN created<br><br>
### .post('/users/logout')Will logout the user<br><br>
### .post('/users/logoutAll' Will logout ALL the users<br><br>
### .post('/users/me/avatar') Will create a profile picture and resize it to 250x250 png (If the user is going to upload it) The format must be png,jpeg or jpg<br><br>
### .post('/tasks') Will create a new task (The "completed" value will be set to false if it's not provided<br><br>

## Using the .(delete) method You can delete the user or a specific task by it's **ID**<br><br>
### .delete('/tasks/:id') Will delete a specific task<br><br>
### .delete('/users/me') WIll delete the user<br><br>

## Using the .patch() method You are able to modify the *name, email, age, password* only for the logged in user, and you can modify the task properties too<br><br>
### .patch('/users/me') You will be able to change the name, email , age and password<br><br>
### .patch('/tasks/:id') You can change the task description or its "completed" value<br><br>



## You can update a profile picture, and by using **sharp** it will be auto converted to a 250x250 and png format






