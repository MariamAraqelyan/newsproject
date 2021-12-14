import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { ISortItem } from './simple-sorting-switcher.interface';

@Component({
  selector: 'newsreel-simple-sorting-switcher',
  templateUrl: './simple-sorting-switcher.component.html',
  styleUrls: ['./simple-sorting-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleSortingSwitcherComponent {
  @Input() public disabled = false;
  @Input() public sortItems: ISortItem[] = [];
  @Output() public selected = new EventEmitter();

  public trackItems(index: number, sortItem: ISortItem): string {
    return sortItem.value;
  }

  public select(sortItem: ISortItem): void {
    if (sortItem.active || this.disabled) {
      return;
    }

    this.sortItems = this.sortItems.map((item) => ({ ...item, active: item.value === sortItem.value }));
    this.selected.emit(sortItem.value);
  }
}
