import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@app/features/feature-productos/services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void
  {
    var consulta = this.categoryService.GetCategory().valueChanges.subscribe(t=>{
      debugger
      var result = t.data.allCategories

    });
  }

}
