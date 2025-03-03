# Use Node.js as the base image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Debug: Print the directory structure
RUN ls -la

# Ensure the entry file exists
RUN test -f index.html || (echo "Missing index.html"; exit 1)

# Build the app
RUN npm run build

# Use Nginx for serving the built application
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 81 instead of 80
EXPOSE 81

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

