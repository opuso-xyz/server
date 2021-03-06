FROM node:10
ARG PORT
ARG MONGO_URI
ARG APP_SECRET
ENV PORT=$PORT
ENV MONGO_URI=$MONGO_URI
ENV APP_SECRET=$APP_SECRET

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]
