# docker build -t realestate-react .
# docker run -d -p 80:80 --name realestate-react realestate-react

# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run your app using CMD which runs npm start
CMD ["npm", "start"]