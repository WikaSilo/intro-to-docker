# Create your Docker Images

## Setup

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

# 2. install setup for development
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
> docker build -t wikanyaa/intro-to-docker:1.0 ./

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

`docker container run --name [containerName] -p [localPath:containerPath] -v $(pwd):[WORKDIR] [image_name] [CMD]`
> `docker run --name introToDocker -p 4002:4002 -v $(pwd):/usr/local/app wikanyaa/express-demo:1.0 nodemon app.js`

### Another Tips

- Biasanya, permission langsung ke sudo, untuk merubah kalian bisa dengan:

```Dockerfile
# perubah permission, dari root ke node
RUN chown -R node:node .

USER node
```

- Menggunakan `tini` agar proses shutdown lebih baik, sehingga process yang tidak dibutuhkan juga bisa dihilangkan

```Dockerfile
# install tini di dalam docker
RUN apk add --no-cache tini

ENTRYPOINT ["/sbin/tini, "--"]
```
