FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/* 
COPY /dist/MindChallenge/browser  /usr/share/nginx/html
