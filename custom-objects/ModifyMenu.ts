import { DisplayOrderItem, InitialSelections } from "@_types/admin/modify-menu";

class PostMenuInfo {
  static async Create(menuSection: string, info: any, infoIsFormData = false) {
    let body = infoIsFormData ? info : JSON.stringify(info);
    let headers = infoIsFormData
      ? undefined
      : { "Content-Type": "application/json" };
    const res = await fetch(`/api/admin/modify-menu/${menuSection}/modify`, {
      method: "POST",
      body,
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to create new " + menuSection, data);
    }
    return data;
  }

  static async Modify(menuSection: string, info: any, infoIsFormData = false) {
    let body = infoIsFormData ? info : JSON.stringify(info);
    let headers = infoIsFormData
      ? undefined
      : { "Content-Type": "application/json" };
    const res = await fetch(`/api/admin/modify-menu/${menuSection}/modify`, {
      method: "PATCH",
      body,
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to modify " + menuSection, data);
    }
    return data;
  }
}

class GetMenuInfo {
  static async Customizations(menuSection: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/${menuSection}/customizations`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        "Failed to fetch customizations for " + menuSection,
        data
      );
    }
    return data;
  }
  static async Selections(menuSection: string, id: number) {
    const res = await fetch(
      `/api/admin/modify-menu/${menuSection}/selections/${id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch selections for " + menuSection, data);
    }
    return data;
  }

  static async Existing(menuSection: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/${menuSection}/existing`,
      { cache: "no-store" }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Failed to fetch existing ${menuSection}s`, data);
    }
    return data;
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
