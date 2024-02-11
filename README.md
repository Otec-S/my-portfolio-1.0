# Pet project by frontend developer Sergey Grigorash

The Movie Explorer project allows registered users to search through a small (around 100) database of non-commercial/obscure movies, which is loaded via API upon the first search request. The search state and found movies are stored in localStorage and remain there until the user logs out.

By clicking the button in the top right corner of the movie card, the user can save it to the "Saved Movies" section, where a separate search can also be conducted.
Saved movies are stored on the backend (Express.js) in a MongoDB database. Registered user accounts are also stored there for subsequent authorization.

## Link to the backend repository on GitHub

https://github.com/Otec-S/movies-explorer-api.git

## Running the Project Locally

### 1) Starting the backend:

- Clone the repository **https://github.com/Otec-S/movies-explorer-api.git**
- Install dependencies using **npm install** (ensure MongoDB is also installed)
- Start MongoDB using **mongod**
- Run the backend using **npm run dev**

### 2) Starting the frontend:

- Clone the current repository
- Install dependencies using **npm install**
- Start the frontend using **npm start**

**You're awesome!**

_PS Website is in Russian language_
