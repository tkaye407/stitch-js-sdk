import StitchAuthRequestClient from "../auth/internal/StitchAuthRequestClient";
import { StitchAppRoutes } from "../internal/net/StitchAppRoutes";
import Method from "./net/Method";
import StitchAuthDocRequest from "./net/StitchAuthDocRequest";

export default class CoreStitchAppClient {
  private readonly authRequestClient: StitchAuthRequestClient;
  private readonly routes: StitchAppRoutes;

  public constructor(
    authRequestClient: StitchAuthRequestClient,
    routes: StitchAppRoutes
  ) {
    this.authRequestClient = authRequestClient;
    this.routes = routes;
  }

  public callFunctionInternal<T>(name: string, ...args: any[]): Promise<T> {
    // TODO: STITCH-1510
    return this.authRequestClient.doAuthenticatedJSONRequest(
      this.getCallFunctionRequest(name, args)
    );
  }

  private getCallFunctionRequest(
    name: string,
    ...args: any[]
  ): StitchAuthDocRequest {
    const body = {
      args,
      name,
    };

    const reqBuilder = new StitchAuthDocRequest.Builder();
    reqBuilder.withMethod(Method.POST).withPath(this.routes.functionCallRoute);
    reqBuilder.withDocument(body);
    return reqBuilder.build();
  }
}