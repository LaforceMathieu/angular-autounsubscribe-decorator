import { Subject } from "rxjs/Subject";

export function AutoUnsubscribe() {
  return function(constructor) {
    const baseOnDestroy = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function() {
      for (const propertyName in this) {
        if (this.hasOwnProperty(propertyName)) {
          const property = this[propertyName];
          if (property && property instanceof Subject) {
            property.unsubscribe();
          }
        }
      }

      if (baseOnDestroy) {
        baseOnDestroy.apply(this, arguments);
      }
    };
  };
}
