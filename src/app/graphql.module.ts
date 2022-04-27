import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import { InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { hKey } from '../cred';

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory:  (httpLink:any) => {
        return {
          link: httpLink.create({
            uri: "https://loving-drake-15.hasura.app/v1/graphql",
              // If needed, you can set custom headers here
              headers: new HttpHeaders({
                "x-hasura-admin-secret": hKey,
                "x-hasura-default-role": "partner",
              })
          }),
          cache: new InMemoryCache()
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
