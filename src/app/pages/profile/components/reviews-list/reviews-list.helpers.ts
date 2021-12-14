import { ISortItem } from 'src/app/shared/components/simple-sorting-switcher';
import { SORT_TOP } from './reviews-list.constants';

export function getSortItems(sortDir = SORT_TOP): ISortItem[] {
  const isTop = sortDir === SORT_TOP;

  return [
    {
      label: 'Top',
      value: '-rating',
      active: isTop
    },
    {
      label: 'New',
      value: '-id',
      active: !isTop
    }
  ];
}
