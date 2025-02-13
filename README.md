microservice app  
pnpm install  
docker exec -it postgres_db psql -U root -l  
docker exec -it mongo_db mongosh --username root --password password --authenticationDatabase admin --eval "show dbs"
type orm
docker system prune -af
docker builder prune -a
