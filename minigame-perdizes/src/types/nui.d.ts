/** GetParentResourceName é injetado pelo client do FiveM dentro do NUI (CEF). */
declare global {
  interface Window {
    GetParentResourceName?: () => string;
  }
}

export {};
