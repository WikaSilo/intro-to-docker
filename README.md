# Deploy P3 Challenge 2

## client-mobile

Untuk deploy aplikasi expo, kalian bisa menggunakan publish:
client-mobile: `expo publish`

## server

**Pengguna windows**, karena sering terjadi error pada laptop saat install docker, kalian boleh skip untuk coba docker di local (melakukan docker container run...), kalian bisa langsung lakukan deploy docker ke heroku.

Skema deploy:

- server/services/app: (express.js + postgres) -> deploy heroku menggunakan docker, db di heroku
- server/services/user: (express.js + mongodb) -> deploy heroku menggunakan docker, db di atlas
- server/orchestrator: (graphql + redis) -> deploy heroku menggunakan docker, db di redislab
