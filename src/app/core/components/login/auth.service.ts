import {Injectable} from '@angular/core';
import {CacheService} from './cache.service';
import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import * as decode from 'jwt-decode';
import {Apollo, gql} from "apollo-angular";

interface IServerAuthResponse {
  accessToken: string;
}

export interface IAuthStatus {
  role: string;
  primarysid: number;
  unique_name: string;
  email: string;
  exp: number
}

const defaultAuthStatus: IAuthStatus = {
  role: 'none', email: null,
  primarysid: null, unique_name: null, exp: 0
};

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {
  private readonly authProvider: (usuario: Usuario) => Observable<IServerAuthResponse>;
  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus);

  constructor(private apollo: Apollo, public router: Router) {
    super();
    this.authStatus.subscribe(authStatus => {
      this.setItem('authStatus', authStatus);
    });
    this.authProvider = this.userAuthProvider;
  }

  private userAuthProvider(usuario: Usuario): Observable<IServerAuthResponse> {
    return this.apollo.mutate({
      mutation: GenerateToken,
      variables: {
        credentialsInput: usuario
      }
    }).pipe(map((t) => (t.data["generateToken"] as IServerAuthResponse)))
  }

  login(usuario: Usuario): Observable<IAuthStatus> {
    this.logout();
    const loginResponse = this.authProvider(usuario).pipe(
      map((respuesta: any) => {
        if (!respuesta.accessToken){
          throw (respuesta);
        }
        const accessToken = decode(respuesta.accessToken);
        this.setToken(respuesta.accessToken);
        return accessToken as IAuthStatus;
      })
    );
    loginResponse.subscribe(
      result => {
        this.authStatus.next(result);
      },
      error => {
        this.logout();
        return observableThrowError(error);
      }
    );
    return loginResponse;
  }

  logout() {
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
    this.router.navigate(['']);
  }

  private setToken(jwt: string) {
    return this.setItem('jwt', jwt);
  }

  getToken(): string {
    return this.getItem('jwt') || '';
  }

  private clearToken() {
    this.removeItem('jwt');
  }

  getAuthStatus(): IAuthStatus {
    return this.getItem('authStatus');
  }
}

export class Usuario {
  email: string;
  password: string;
}

const GenerateToken = gql`
mutation generateToken($credentialsInput:Credentials) {
  generateToken(credentials:$credentialsInput)
   {
    accessToken,
    Message
  }
}
`;
