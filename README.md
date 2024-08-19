# Login-Authenticator
Sign ups and Log in authenticator with MongoDB




# Dependencies used :

- dotenv: Loads environment variables from the .env
- express: A web framework for building the server.
- mongoose: A MongoDB object modeling tool designed to work in an asynchronous environment.
- cors: Middleware for enabling Cross-Origin Resource Sharing.
- mongoose-unique-validator: Adds pre-save validation for unique fields within a Mongoose schema.
- bcrypt: Library for hashing passwords.
- jsonwebtoken: For generating and verifying JWT tokens.
- @sendgrid/mail: Used for sending emails via SendGrid.




# USAGE:

- Run your nodejs server file
- Make sure your mongodb compass is open and running, plus active connection with a point
- Ensure your server side code connects to the same point as your MongoDB compass
- And ensure your server file is running on a certain port. I have set it to 5000
- And on client side, used the server side point (5000) to access it.




## View demo on : https://loginauthenticator.netlify.app/