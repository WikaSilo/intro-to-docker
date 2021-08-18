# Docker Compose

Ketika kalian development aplikasi yang besar yang butuh banyak integrasi, tentunya kalian juga membutuhkan beberapa container yang berjalan bersamaan. Untuk itu kalian bisa menjalankan multi-container sekaligus dengan menggunakan `docker-compose`.

## Setup
Contohnya kita akan menjalankan aplikasi yang membutuhkan database. Aplikasi ini berisi:
- node.js
- express.js
- mongodb

## Config
Kalian perlu membuat `docker-compose.yml`

## Run docker-compose
- `docker-compose ps`
  Untuk melihat list docker-compose
- `docker-compose -up -d`
  Untuk running docker-compose
- `docker-compose logs`
  Untuk melihat log saat docker-compose berjalan
- `docker-compose stop`
  Untuk menghentikan docker-compose
- `docker-compose down`
  Untuk menghapus docker-compose