FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY start_script.sh ./start_script.sh
RUN chmod +x start_script.sh
EXPOSE 3000
ENTRYPOINT ["sh", "./start_script.sh"]
