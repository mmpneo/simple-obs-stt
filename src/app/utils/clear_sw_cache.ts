import {ClientType, GetClientType} from "./client_type";

export async function ClearSWCache() {
  let keys = await caches.keys();
  keys     = keys.filter(key => /^(ngsw).*api.*/.test(key));
  const promises = keys.map((eachCacheName) => caches.delete(eachCacheName));
  await Promise.all(promises);
  console.log("[System] Clear client cache")
  if (!!navigator.serviceWorker?.getRegistrations) {
    const regs = await navigator.serviceWorker?.getRegistrations();
    for(let registration of regs) registration.unregister();
  }
}
