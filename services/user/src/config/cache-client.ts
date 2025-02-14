import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
dotenv.config();
const packageDefinition = protoLoader.loadSync(
  process.env.PROTO_PATH as string
);
const cacheProto: any = grpc.loadPackageDefinition(packageDefinition).cache;

const cacheClient = new cacheProto.CacheService(
  `cache-service:${process.env.GRPC_PORT}`,
  grpc.credentials.createInsecure()
);
cacheClient.get = (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    cacheClient.GetCache({ key: key }, (error: any, response: any) => {
      if (error) return reject(error);
      resolve(response.value ? JSON.parse(response.value) : null);
    });
  });
};
cacheClient.set = (
  key: string,
  data: any,
  ttl: number = 300
): Promise<void> => {
  return new Promise((resolve, reject) => {
    cacheClient.SetCache(
      { key: key, value: JSON.stringify(data), ttl },
      (error: any, response: any) => {
        if (error) return reject(error);
        resolve();
      }
    );
  });
};
cacheClient.del = (key: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    cacheClient.DeleteCache({ key: key }, (error: any) => {
      if (error) return reject(error);
      resolve();
    });
  });
};
export default cacheClient;
