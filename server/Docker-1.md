# Intro To Docker

ref: [Links](https://www.docker.com/)

[Docker_Memes](https://pics.me.me/thumb_it-works-on-my-machine-then-well-ship-your-machine-64347033.png)

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

> Coba pull image mongo:4.2 dari dockerHub
> `docker pull mongo:4.2`

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

> Coba buat container yang berisi image mongo:4.2 dengan nama dockerMongo dengan menggunakan port 17017
> `docker container create --name mongo-docker -p 17017:27017 mongo:4.2`

### Start Container

- `docker container start [containerName]`
  Menjalankan/run container yang sudah dibuat
- `docker container stop [containerName]`
- Memberhentikan container yang sedang jalan/run

> Jalankan container mongo, dengan command:
> `docker container start mongo-docker`
> Lalu akses database mongodb local dengan mongodb dari docker. Lihat perbedaannya
> `mongo mongodb://localhost:27017`
> `mongo mongodb://localhost:17017`

### Run Container

- `docker container run -p [localPort:containerPort] [image_name]` digunakan untuk membuat dan langsung run container yang diinginkan

> Bisa diulang, proses akses mongo docker dengan run
> `docker container run --name mongo-docker -p 17017:27017 mongo:4.2`
> Bisa juga akses node dengan run
> `docker container run -it node:16.13 node`
