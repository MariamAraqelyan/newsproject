import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ICategory} from './inline-navbar.interface';
import {ConfigService} from '../../../../shared/services/config';

@Component({
  selector: 'newsreel-inline-navbar',
  templateUrl: './inline-navbar.component.html',
  styleUrls: ['./inline-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineNavbarComponent implements OnInit {
  @Input() categories: ICategory[] = [];
  public selectedTypeIndex: number;

  constructor(private ConfigService: ConfigService) {

  }

  ngOnInit(): void {
    this.checkOldFilter();
  }

  public postTypeList: Array<any> = [
    {
      'name': 'Hot',
      'icon': 'hot-image',
      'type': 'last_3_days_upvotes'
    },
    {
      'name': 'New',
      'icon': 'new-image',
      'type': 'newest'
    },
    {
      'name': 'Subscribed',
      'icon': 'subscribed-image',
      'type': 'subscribed'
    },
    {
      'name': 'Trusted',
      'icon': 'trusted-image',
      'type': 'trusted'
    },
    {
      'name': 'Controversial',
      'icon': 'controversial-image',
      'type': 'controversial'
    }
  ];

  public selectedItem = this.postTypeList[0];

  public trackCategories(index: number, category: ICategory): string {
    return category.label;
  }

  public changePostType(type, index): void {
    this.selectedTypeIndex = index;
    this.selectedItem = this.postTypeList[index];
    this.ConfigService.filterData.next({'selectedType': type, 'selectedIndex': index});
  }

  public checkOldFilter(): void {
    const filterValue = JSON.parse(sessionStorage.getItem('postFilterKey'));
    if (filterValue) {
      this.postTypeList.filter((item, index: number) => {
        if (item.type === filterValue) {
          this.changePostType(item.type, index);
        }
      });

    }
  }
}
