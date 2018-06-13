import { StitchAppClientInfo } from "stitch-core";
import { CoreRemoteMongoClientImpl } from "stitch-core-services-mongodb-remote";
import { NamedServiceClientFactory, StitchServiceClient } from "stitch-web";
import RemoteMongoClientImpl from "./internal/RemoteMongoClientImpl";
import RemoteMongoDatabase from "./RemoteMongoDatabase";

/**
 * The remote MongoClient used for working with data in MongoDB remotely via Stitch.
 */
export interface RemoteMongoClient {
  /**
   * Gets a {@link RemoteMongoDatabase} instance for the given database name.
   *
   * @param name the name of the database to retrieve
   * @return a {@code RemoteMongoDatabase} representing the specified database
   */
  db(name: string): RemoteMongoDatabase;
}

export class RemoteMongoService {
  public static readonly Factory: NamedServiceClientFactory<
    RemoteMongoClient
  > = new class implements NamedServiceClientFactory<RemoteMongoClient> {
    public getClient(
      service: StitchServiceClient,
      client: StitchAppClientInfo
    ): RemoteMongoClient {
      return new RemoteMongoClientImpl(new CoreRemoteMongoClientImpl(service));
    }
  }();
}
