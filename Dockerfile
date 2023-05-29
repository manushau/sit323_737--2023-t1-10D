# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Install mocha as a global package
RUN npm install -g mocha

# Copy the application files to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 8080

# Run the tests using mocha
CMD [ "node", "server.js" ]
