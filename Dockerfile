# Use a lightweight base image
FROM node:20-alpine

# Set the working directory
WORKDIR /code

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies and clean npm's cache
RUN npm install --production && \
    npm cache clean --force

# Copy the application code
COPY . .

# Set the non-root user to run the application
USER node

# Expose the port that the application runs on
EXPOSE 3000

# Define a health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1

# Start the application
CMD [ "node", "dist/index.js" ]

