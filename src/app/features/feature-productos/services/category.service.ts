import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';

const Get_Category = gql`
query{
  allCategories {
    name
  }
}
`;

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private apollo: Apollo) { }
  public GetCategory() {
    return this.apollo.watchQuery<any>({
      query: Get_Category
    });

  }
}
