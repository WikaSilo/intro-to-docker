# Intro To Docker

ref: [Links](https://www.docker.com/)

Dengan docker, tidak lagi ada alasan "tadi di komputer saya jalan kok". Docker menyelesaikan masalah perbedaan OS dan tools-version yang digunakan saat development aplikasi.

## Docker Basic Command

Overall kalian bisa pelajari dengan bantuan `--help` untuk setiap command. Misalnya: `docker --help` akan keluar command apa saja yang tersedia.

### Images

- `docker images`
  Menampilkan semua image yang ada di local
- `docker pull [imageName_from_dockerhub]:[tag]`
  Mengambil image dari dockerhub
- `docker image rm [imageName_in_local]`
  Menghapus image yang ada di local

### Containers

- `docker container ps`
  Menampilkan semua container yang sedang berjalan/run
- `docker containers ps -a`
  Menampilkan semua container yang ada, baik yang sedang berjalan/run atau yang mati/stop
- `docker container rm [containerName]`
  Menghapus container yang sudah berhenti dan tidak digunakan

### Create Container

Kita akan membuat dan menjalankan mongodb di docker.

- `docker container create --name [containerName] -p [localPort:containerPort] [image_name]`
  Digunakan untuk membuat container baru dengan image yang sudah ada.

### Start Container

- `docker container start [containerName]`
  Menjalankan/run container yang sudah dibuat
- `docker container stop [containerName]`
- Memberhentikan container yang sedang jalan/run

### Run Container

- `docker container run -p [localPort:containerPort] [image_name]` digunakan untuk membuat dan langsung run container yang diinginkan

## Create your Docker Images

### Setup

Ketika membuat docker image yang berisi aplikasi kita, kita perlu membuat file `Dockerfile` berisi konfigurasi aplikasi seperti image apa saja yang diperlukan dan mendefinisikan bagaimana cara menjalankan aplikasi tersebut.

```Dockerfile
# based image yang akan digunakan
FROM node:16.13

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /usr/local/app

# untuk set ENV dalam aplikasi kita
ENV PORT=4002

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /usr/local/app/

# Install npm & Mengapus cache
RUN npm install && npm cache clean --force

# 2 install setup for development
RUN npm install -g nodemon

# copy semua file & folder ke WORKDIR
COPY ./ ./

# execute apps: production
CMD ["npm", "run", "start"]

```

Kalian juga bisa membuat .dockerignore supaya dalam container tidak berisi hal yang tidak diperlukan:

```.dockerignore
node_modules
Dockerfile
```

Kemudian build aplikasi kita menjadi sebuah image dengan:

`docker build -t [image_name]:[version] [path_Dockerfile]`

> `docker build -t wikanyaa/intro-to-docker:1.0 ./`

### Create and Run Container**

`docker container run --name [containerName] -p [localPort:containerPort] [image_name]`

Cara ini digunakan jika kamu ingin membuat container sekaligus menjalankan containernya.
`-d` digunakan supaya container dijalankan di background sistem.

## Docker image for development

Saat development, tentunya kita sering melakukan perubahan code dan restart aplikasi di local. Jika kalian menggunakan `run` atau `container start`, container yang berisi aplikasi kalian tidak akan update.

Untuk hal ini, kita bisa menggunakan *bind mount a volume* `-v [localPath]:[WORKDIR]` sehingga setiap perubahan yang terjadi di local, terjadi juga perubahannya di container.

Sama halnya ketika development, kita bisa menggunakan `nodemon` saat running aplikasi, sehingga setiap perubahan bisa langsung reload. Kalian bisa build ulang image sebelumnya dengan menambahkan cmd baru untuk install nodemon:

```md
RUN npm install -g nodemon
```

### Binding local code to volume docker image

`docker run --name [containerName] -p [localPath:containerPath] -v $(pwd):[WORKDIR] [image_name] [CMD]`
> `docker run --name introToDocker -p 4002:4002 -v $(pwd):/usr/local/app wikanyaa/express-demo:1.0 nodemon app.js`

## Deploy Dockerizing to Heroku

### Create heroku.yml

ref: [links](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml)

Buatlah `heroku.yml` pada aplikasi docker yang ingin kita deploy, sebagai berikut:

```yml
build:
  docker:
    web: Dockerfile
```

### Setup deploy

Lalu lakukan CLI dalam terminal kalian, posisi terminal berada pada server:

```shell
# heroku create [nama_aplikasi-heroku] --remote [push ke remote mana, nama remote]
heroku create rome-service-app --remote heroku-app-microservices

# menentukan remote origin, binding dengan aplikasi yang sudah dibuat
heroku git:remote --remote heroku-app-microservices -a rome-service-app

# info heroku supaya heroku tahu bahwa ini menggunakan docker
heroku stack:set container --app rome-service-app

# heroku push, harus menggunakan subtree supaya tidak semua ke push 
# pastikan pada tahap ini, kalian sudah menggunakan process.ENV untuk port
# kalian pindah ke folder git terluar
# UNTUK BEBERAPA WINDOWS, penggunaan subtree perlu diinstall
git subtree push --prefix server/services/app heroku-app-microservies master

# pada heroku, kalian tambahkan database postgres

# buka bash heroku
heroku run bash -a rome-service-app

# migrate
# pastikan kalian sudah menambahkan NODE_ENV pada heroku: production, berhubungan di model
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# exit, lalu buka aplikasi
heroku open
```
