import { DisplayOrderItem } from "@_types/admin/modify-menu";
import APIRequest from "./Fetch";
import { ItemDateRange } from "@_types/admin/forms";
import { formatDateRange } from "@_utils/admin/modify-menu";
import { InitialSelections } from "@_hooks/admin/menu/modification/useSelections";

class PostMenuInfo {
  static async Create<T>(
    menuSection: string,
    info: any,
    infoIsFormData = false
  ) {
    let body = infoIsFormData ? info : JSON.stringify(info);
    let headers = infoIsFormData
      ? undefined
      : { "Content-Type": "application/json" };
    return APIRequest.request<T>(
      `/api/admin/modify-menu/${menuSection}/modify`,
      {
        method: "POST",
        body,
        headers,
      }
    );
  }

  static async Modify<T>(
    menuSection: string,
    info: any,
    infoIsFormData = false
  ) {
    let body = infoIsFormData ? info : JSON.stringify(info);
    let headers = infoIsFormData
      ? undefined
      : { "Content-Type": "application/json" };
    return APIRequest.request<T>(
      `/api/admin/modify-menu/${menuSection}/modify`,
      {
        method: "PATCH",
        body,
        headers,
      }
    );
  }
}

class GetMenuInfo {
  static async Customizations<T>(menuSection: string) {
    return APIRequest.pageRequest<T>(
      `/api/admin/modify-menu/${menuSection}/customizations`,
      { cache: "no-store" }
    );
  }

  static async Selections<T>(menuSection: string, id: number) {
    return APIRequest.request<T>(
      `/api/admin/modify-menu/${menuSection}/selections/${id}`,
      { cache: "no-store" }
    );
  }

  static async Existing<T>(menuSection: string) {
    return APIRequest.pageRequest<T>(
      `/api/admin/modify-menu/${menuSection}/existing`,
      { cache: "no-store" }
    );
  }
}

export default class ModifyMenu {
  static Get = GetMenuInfo;

  static Post = PostMenuInfo;

  static CompareVal(origVal: any, newVal: any) {
    return newVal === origVal ? undefined : newVal;
  }

  static CompareDateRange(origRange: ItemDateRange, newRange: ItemDateRange) {
    const newDRange = formatDateRange(newRange);
    const oldDRange = formatDateRange(origRange);
    return newDRange === oldDRange ? undefined : newDRange;
  }

  static CheckArrayLen(array: any[]) {
    return array.length === 0 ? undefined : array;
  }

  static SelectionsToArray(selections: InitialSelections) {
    return Object.keys(selections).map((key) => key) as string[];
  }

  static SelectionsToNewAndRemoved(
    initialSelections: InitialSelections,
    currentSelections: InitialSelections
  ) {
    return this.GetNewAndRemovedIds(
      this.SelectionsToArray(initialSelections),
      this.SelectionsToArray(currentSelections)
    );
  }

  static GetNewAndRemovedIds<T extends any = number>(
    initialIds: T[],
    currentIds: T[]
  ) {
    return {
      newIds: this.GetNewIds(initialIds, currentIds),
      removedIds: this.GetRemovedIds(initialIds, currentIds),
    };
  }

  static GetNewIds<T extends any = number>(initialIds: T[], currentIds: T[]) {
    const newIds = currentIds.filter((id) => {
      return !initialIds.includes(id);
    });
    if (newIds.length === 0) return undefined;
    return newIds;
  }

  static GetRemovedIds<T extends any = number>(
    initialIds: T[],
    currentIds: T[]
  ) {
    const removedIds = initialIds.filter((id) => {
      return !currentIds.includes(id);
    });
    if (removedIds.length === 0) return undefined;
    return removedIds;
  }

  static GetNewAndRemovedDisplayOrders(
    initialDisplayOrders: DisplayOrderItem[],
    currentDisplayOrders: DisplayOrderItem[]
  ) {
    let modifiedDisplayOrders = currentDisplayOrders.filter((item) => {
      for (let i = 0; i < initialDisplayOrders.length; i++) {
        const initialItem = initialDisplayOrders[i];
        if (initialItem.id === item.id) {
          if (initialItem.displayOrder !== item.displayOrder) return true;
          return false;
        }
      }
      return true;
    });
    const removedIds = this.GetRemovedDisplayOrderIds(
      initialDisplayOrders,
      currentDisplayOrders
    );
    return {
      modifiedDisplayOrders:
        modifiedDisplayOrders.length === 0 ? undefined : modifiedDisplayOrders,
      removedIds,
    };
  }

  static GetRemovedDisplayOrderIds(
    initialIds: DisplayOrderItem[],
    currentIds: DisplayOrderItem[]
  ) {
    const removedIds: number[] = [];
    initialIds.forEach(({ id }) => {
      let contains = false;
      for (let i = 0; i < currentIds.length; i++) {
        if (currentIds[i].id === id) {
          contains = true;
          break;
        }
      }
      if (!contains) removedIds.push(id);
    });
    if (removedIds.length === 0) return undefined;
    return removedIds;
  }
}
