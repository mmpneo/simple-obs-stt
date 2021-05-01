export async function ClearSWCache() {
  let keys = await caches.keys();
  keys     = keys.filter(key => /^(ngsw).*api.*/.test(key));
  const promises = keys.map((eachCacheName) => caches.delete(eachCacheName));
  await Promise.all(promises);
  console.log("[System] Clear client cache")
}
