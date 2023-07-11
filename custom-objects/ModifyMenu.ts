import { DisplayOrderItem, InitialSelections } from "@_types/admin/modify-menu";
import APIRequest from "./Fetch";

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
    return APIRequest.request<T>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/${menuSection}/customizations`,
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
    return APIRequest.request<T>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/${menuSection}/existing`,
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

  static CheckArrayLen(array: any[]) {
    return array.length === 0 ? undefined : array;
  }

  static SelectionsToArray(selections: InitialSelections) {
    return Object.keys(selections).map((key) => +key);
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

  static GetNewAndRemovedIds(initialIds: number[], currentIds: number[]) {
    return {
      newIds: this.GetNewIds(initialIds, currentIds),
      removedIds: this.GetRemovedIds(initialIds, currentIds),
    };
  }

  static GetNewIds(initialIds: number[], currentIds: number[]) {
    const newIds = currentIds.filter((id) => {
      return !initialIds.includes(id);
    });
    if (newIds.length === 0) return undefined;
    return newIds;
  }

  static GetRemovedIds(initialIds: number[], currentIds: number[]) {
    const removedIds = initialIds.filter((id) => {
      return !currentIds.includes(id);
    });
    if (removedIds.length === 0) return undefined;
    return removedIds;
  }

  static GetNewDisplayOrders(
    initialDisplayOrders: DisplayOrderItem[],
    currentDisplayOrders: DisplayOrderItem[]
  ) {
    const displayOrders = currentDisplayOrders.filter((item) => {
      for (let i = 0; i < initialDisplayOrders.length; i++) {
        const initialItem = initialDisplayOrders[i];
        if (initialItem.id === item.id) {
          if (initialItem.displayOrder !== item.displayOrder) return true;
          return false;
        }
      }
      return true;
    });
    if (displayOrders.length === 0) return undefined;
    return displayOrders;
  }
}
