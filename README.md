#  Project Management

This code allows candidates to view projects, accept them, and mark their status. Its frontend UI is shown below

![Screenshot (101)](https://github.com/user-attachments/assets/b8ef7d1e-2c5d-4343-9964-0fbc1f670023)



To run the codes, install the necessary dependencies for both frontend and backend. 

## Backend

Ensure that MongoDB is running in the background.

```
npm init -y
```
```
npm install express mongoose cors body-parser
```

I created a ```populate.js``` file to populate your database with sample data. 

```
node populate.js
```

## Frontend

```
npx create-react-app project-management-frontend
cd project-management-frontend
npm install axios
```

Replace App.js in your src folder with the given App.js and update the candidate id according to your database.

## Run the servers

```
node /project-management-backend/index.js
```

```
cd project-management-frontend
npm start
```
