import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

export function getFirstChildRouteSnapshot(route: ActivatedRoute): ActivatedRouteSnapshot {
  while (route.firstChild) {
    route = route.firstChild;
  }

  return route.snapshot;
}
