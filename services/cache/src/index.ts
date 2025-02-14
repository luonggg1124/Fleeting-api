import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();
const redis = new Redis(process.env.REDIS_URL as string);
const PORT=process.env.PORT;
const packageDefinition = protoLoader.loadSync(process.env.PROTO_PATH as string);
const cacheProto: any = grpc.loadPackageDefinition(packageDefinition).cache;

const cacheService = {
    GetCache: async (call: any, callback:any) => {
        const value = await redis.get(call.request.key);
        callback(null,{value: value || ""});
    },
    SetCache: async (call:any, callback:any) => {
        await redis.setex(call.request.key, call.request.ttl || 300, call.request.value);
        callback(null, {message: "Cached successfully"})
    },
    DeleteCache: async (call: any, callback: any) => {
        await redis.del(call.request.key);
        callback(null, { message: "Cache deleted" });
      }
}

const server = new grpc.Server();
server.addService(cacheProto.CacheService.service,cacheService);
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`🚀 Cache Service running on gRPC port ${PORT}`);
});