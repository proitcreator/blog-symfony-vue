# blog-symfony-vue
Simple blog: Docker, Docker Compose, Symfony 6, Api Platform (Rest API), JWT Authentication, Nuxt 3, Vue 3, Vuetify 3

1. `git clone https://github.com/proitcreator/blog-symfony-vue`
2. `cd blog-symfony-vue`
3. `cp -n -p .env.dev .env && cp -n -p php-apache/app/.env.dev php-apache/app/.env`
4. `docker-compose up --build -d`
5. wait 2 minutes for the database to initialize...
6. `docker exec -it php-apache /bin/sh -c "php bin/console doctrine:migrations:migrate"`

- API: http://localhost:8000/api
- Client: http://localhost:3000
  
User1:
- login: user1
- password: 123

User2:
- login: user2
- password: 123
