
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define the environment variables (replace with actual values)
ENV NODE_ENV=production
ENV PORT=3000
ENV TOKEN_SECRET=your_token_secret
ENV MONGODB_URL=mongodb://your_mongodb_url
ENV CORS_ORIGIN=http://localhost:4000
ENV ASTRO_JWT_SECRET=AFSDFDSFADSFSDFSDVSV
ENV ASTRO_JWT_EXPIRY=356d
ENV USER_JWT_SECRET=dfshlashviuhfavhawovhow
ENV USER_JWT_EXPIRY=356d
# Start the application
CMD ["npm", "start"]

