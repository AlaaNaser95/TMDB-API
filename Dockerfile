FROM node:20-alpine 
WORKDIR /app
COPY . .
RUN npm install
RUN chmod +x start_script.sh
# EXPOSE 3000
ENTRYPOINT ["sh", "./start_script.sh"]
