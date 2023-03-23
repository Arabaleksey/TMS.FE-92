# Express Node.js Typescript with MongoDB
    
1.  Initialize a new Node.js project by running the following command in the terminal:

    ```
    npm init
    ``` 
    
2.  Install the required dependencies by running the following command in the terminal:

    ```
    npm install express mongoose @types/express @types/mongoose @types/node ts-node typescript
    ``` 
    
3.  Create a new file named `tsconfig.json` in the root of your project directory with the following content:
    ```
    {
      "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "es6",
        "moduleResolution": "node",
        "outDir": "dist",
        "baseUrl": ".",
        "paths": {
          "*": ["node_modules/*", "src/types/*"]
        }
      },
      "exclude": ["node_modules", "dist"]
    }
    ``` 
    
4.  Create a new directory named `src` in the root of your project directory.
    
5.  Inside the `src` directory, create a new file named `app.ts` with the following content:
    
    ```
    import express from 'express';
    import mongoose from 'mongoose';
    
    // Connect to MongoDB
    mongoose.connect('mongodb://localhost/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
    
    // Create Express app
    const app = express();
    
    // Set up routes
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    ```  
6.  In the `package.json` file, update the `scripts` section to include the following:
        
    ```
    "scripts": {
      "start": "node dist/app.js",
      "dev": "ts-node src/app.ts",
      "build": "tsc -p ."
    }
    ``` 
    
    This will allow you to start the server using `npm start`, run the server in development mode using `npm run dev`, and build the TypeScript files to JavaScript using `npm run build`.
    
7.  In the terminal, run `npm run dev` to start the server in development mode.
8. To setup and use env files need to install additional dependency:
    ```
    npm install dotenv
    ```
9. Modify app.ts file by adding additional command:
    ```
    require("dotenv").config();

    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>  console.log("MongoDB connected"))
    .catch((err) =>  console.log(err));
    ``` 
10. Create a .env file and store connection string of MongoDB there:
11. Create public directory and make it static by below commands:
    ```
    app.use(express.static(path.resolve(__dirname, "..", "public")));
    ``` 
12. To work with request body need to add express.json():
    ```
    app.use(express.json());

    ```

 
    
