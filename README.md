for package,json 
mpm init -y

// to install express for server 
npm i express 

// for restart server
npm i nodemon 

Ensure tsconfig.json Includes Type Definitions
/*
   after check the package.json for dependency added or not 
        "dependencies": {
        "express": "^4.21.2",
        "nodemon": "^3.1.9"
    }

    tsConfig.json file
    {
        "compilerOptions": {
        "moduleResolution": "node",
        "esModuleInterop": true,
        "types": ["node"] // Ensure "node" is included
       }
    }

    // create a file server.ts in root folder copy below script

    import express, { Request, Response } from "express";
    const app = express();
    const PORT = 3000;
    app.get("/api/message", (req: Request, res: Response) => {
        res.json({ message: "Hello from Express with TypeScript!" });
    });
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    // add tsconfig.json file include server 
     "include": [
        "cypress/**/**/*.ts", // all spec files 
        "cypress/support/@DocTypes/commands.d.ts", // for documentation //
        "cypress.d.ts", // for intelisense //
        "cypress/support/**/*.d.ts",
        "server.ts"
    ],

    // (Optional) Use a Nodemon Config File
    {
        "watch": ["server.ts"],
        "ext": "ts",
        "exec": "npx ts-node server.ts"
    }
    // modify package.json 
    "scripts": {
        "dev": "nodemon --ext ts --exec ts-node server.ts"
    }
    // To run the server 
    npm run dev

    // Test with curl (from Terminal)
    curl http://localhost:3000/api/message  // expected Out Put is // {"message":"Hello from Express with TypeScript!"}
*/
