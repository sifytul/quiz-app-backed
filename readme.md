# This is a simple backend for a quiz app

### This includes a list of API for creating quiz and chapter list, and authentication and authorization features using express and mongoose with typescript

_To set up this repo, follow this instructions ->_

1. To clone this repo
   `git clone https://github.com/sifytul/quiz-app-backed.git`

2. create a **.env** file and put the necessary info:

```
PORT = *your backend server port (3000)*
MONGO_URI = *Put your mongodb uri or local uri*
JWT_ACCESS_TOKEN_SECRET= *put some secret text*
JWT_REFRESH_TOKEN_SECRET = *put some secret text*
```

3. To install all the dependencies, run
   `yarn`

4. Then run the code in your local server
   `yarn dev`
