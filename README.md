# Intro To Docker

ref: https://www.docker.com/


[<img src="https://pics.me.me/thumb_it-works-on-my-machine-then-well-ship-your-machine-64347033.png" alt="docker_memes">](https://pics.me.me/thumb_it-works-on-my-machine-then-well-ship-your-machine-64347033.png)

Dengan docker, tidak lagi ada alasan "tadi di komputer saya jalan kok". Docker menyelesaikan masalah perbedaan OS dan tools-version yang digunakan saat development aplikasi.

### Setup App
```shell
git clone https://github.com/WikaSilo/intro-to-docker
npm install
```
Aplikasi ini menggunakan:
- node.js
- express.js
- morgan
- nodemon

### Docker Basic Command
Overall kalian bisa pelajari dengan bantuan `--help` untuk setiap command. Misalnya: `docker --help` akan keluar command apa saja yang tersedia.

**Images**
- `docker image`
  Menampilkan semua image yang ada di local
- `docker pull [imageName_from_dockerhub]:[tag]`
  Mengambil image dari dockerhub
- `docker image rm [imageName_in_local]`
  Menghapus image yang ada di local
> Coba pull image mongo:4.2 dari dockerHub
> `docker pull mongo:4.1`

**Containers**
- `docker container ls`
  Menampilkan semua container yang sedang berjalan/run
- `docker container ls -a`
  Menampilkan semua container yang ada, baik yang sedang berjalan/run atau yang mati/stop
- `docker container rm [containerName]`
  Menghapus container yang sudah berhenti dan tidak digunakan

**Create Container**
Kita akan membuat dan menjalankan mongodb di docker.
- `docker container create --name [containerName] -p [localPort:containerPort] [image_name]`
  Digunakan untuk membuat container baru dengan image yang sudah ada.
> Coba jalankan container yang berisi image mongo:4.2 dengan nama dockerMongo dengan menggunakan port 37017
> `docker container create --name mongoDocker -p 17017:27017 mongo:4.1`

**Run Container**
- `docker container start [containerName]`
  Menjalankan/run container yang sudah dibuat
- `docker container stop [containerName]`
- Memberhentikan container yang sedang jalan/run
> Lalu akses database mongodb local dengan mongodb dari docker. Lihat perbedaannya
> `mongo mongodb://localhost:27017`
> `mongo mongodb://localhost:37017`

## Create your Docker Images
Ketika membuat docker image yang berisi aplikasi kita, kita perlu membuat file `Dockerfile` berisi konfigurasi aplikasi seperti image apa saja yang diperlukan dan mendefinisikan bagaimana cara menjalankan aplikasi tersebut.

- `docker build -t [image_name]:[version] [path_Dockerfile]`
  Membuat image baru dari Dockerfile
> `docker build -t wikanyaa/intro-to-docker:1 ./`

## Docker, Another Command
**Create and Run Container**
`docker run -d --name [containerName] -p [localPort:containerPort] [image_name]`
Cara ini digunakan jika kamu ingin membuat container sekaligus menjalankan containernya. `-d` digunakan supaya container dijalankan di background sistem.

**Synchronize, local and containers**
Saat development, tentunya kita sering melakukan perubahan code dan restart aplikasi di local. Jika kalian menggunakan `run` atau `container start`, container yang berisi aplikasi kalian tidak akan update. 

Untuk hal ini, kita bisa menggunakan *bind mount a volume* `-v [localPath]:[WORKDIR]` sehingga setiap perubahan yang terjadi di local, terjadi juga perubahannya di container.

Cara:
`docker run -d --name [containerName] -p [localPath:containerPath] -v $(pwd):[WORKDIR] [image_name]`
> `docker run -d --name introToDocker -p 3001:3000 -v $(pwd):/usr/src/app intro-to-docker`