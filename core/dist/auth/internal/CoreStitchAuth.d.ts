import { Storage } from "../../internal/common/Storage";
import Response from "../../internal/net/Response";
import StitchAuthDocRequest from "../../internal/net/StitchAuthDocRequest";
import StitchAuthRequest from "../../internal/net/StitchAuthRequest";
import StitchRequestClient from "../../internal/net/StitchRequestClient";
import StitchCredential from "../StitchCredential";
import AuthInfo from "./AuthInfo";
import CoreStitchUser from "./CoreStitchUser";
import StitchAuthRequestClient from "./StitchAuthRequestClient";
import { StitchAuthRoutes } from "./StitchAuthRoutes";
import StitchUserFactory from "./StitchUserFactory";
export default abstract class CoreStitchAuth<TStitchUser extends CoreStitchUser> implements StitchAuthRequestClient {
    authInfo: AuthInfo;
    protected readonly requestClient: StitchRequestClient;
    protected readonly authRoutes: StitchAuthRoutes;
    protected abstract userFactory: StitchUserFactory<TStitchUser>;
    protected abstract deviceInfo: {
        [key: string]: string;
    };
    private readonly storage;
    private currentUser?;
    protected constructor(requestClient: StitchRequestClient, authRoutes: StitchAuthRoutes, storage: Storage);
    readonly isLoggedIn: boolean;
    readonly user: TStitchUser | undefined;
    doAuthenticatedRequest(stitchReq: StitchAuthRequest): Promise<Response>;
    doAuthenticatedJSONRequest(stitchReq: StitchAuthDocRequest): Promise<any>;
    doAuthenticatedJSONRequestRaw(stitchReq: StitchAuthDocRequest): Promise<Response>;
    refreshAccessToken(): Promise<any>;
    protected abstract onAuthEvent(): any;
    protected loginWithCredentialBlocking(credential: StitchCredential): Promise<TStitchUser>;
    protected linkUserWithCredentialBlocking(user: CoreStitchUser, credential: StitchCredential): Promise<TStitchUser>;
    protected logoutBlocking(): void;
    protected readonly hasDeviceId: boolean;
    protected readonly deviceId: string | undefined;
    private prepareAuthRequest(stitchReq);
    private handleAuthFailure(ex, req);
    private tryRefreshAccessToken(reqStartedAt);
    private prepUser();
    private attachAuthOptions(authBody);
    private doLogin(credential, asLinkRequest);
    private doLoginRequest(credential, asLinkRequest);
    private processLoginResponse(credential, response);
    private doGetUserProfile();
    private doLogout();
    private clearAuth();
}