This is a template for server.  
This template is in javascript.

features inside:
1. register/ login
2. forgot password
3. update profile
4. send email - default is mailgun (different email providers need to be customized otherwise)
5. ready ejs templates for email

MUST INSTALL DEPENDENCIES
```
1. express
2. cors
3. helmet
4. dotenv
5. joi
6. lodash
7. moment
8. mongoose
9. mongoose-unique-validator
10. firebase-admin
```

MUST INSTALL DEV DEPENDENCIES
```
1. eslint
2. eslint-config-airbnb-base
3. eslint-config-node
4. eslint-import-resolver-alias
5. eslint-plugin-import
6. eslint-plugin-node
7. nodemon
```

Steps:
1. Install packages above.
2. Set env.
```
PORT=4000
NODE_ENV=development

#mongodb
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_NAME=

#firebase
FIREBASE_ADMIN_CREDENTIALS_FILENAME=
FIREBASE_STORAGE_BUCKET=
FIREBASE_REALTIME_DATABASE=

## mailgun
DOMAIN=
MAILGUN_API_KEY=
```

Usage:
```
const expressApp = require('express-firebase-mongoose-template');
const app = express();

app.use('/',(req,res,next)=>{
//controllers
});

app.post('/api-one',(req,res,next)=>{
// post logic here.
})

// wrap your app with expressApp
expressApp(app);
```
