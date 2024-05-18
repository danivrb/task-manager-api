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

### Using the .get() method You can read all of your tasks, or only a specific one by its **ID** or read the profile

### Using the .(post) method You can crate an account, login and logout

### Using the .(delete) method You can delete the user or a specific task by it's **ID**

### Using the .patch() method You are able to modify the *name, email, age, password* only for the logged in user, and you can modify the task properties too

### You can update a profile picture, and by using **sharp** it will be auto converted to a 250x250 and png format




