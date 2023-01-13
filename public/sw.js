const CACHE_NAME = "v0.2.5"
const assetsURLS = ["/", "/assets/index.css", "assets/index.js"]

async function preCache() {
  console.log('CACHING')
  const cache = caches.open(CACHE_NAME)
  return (await cache).addAll(assetsURLS)
}

async function fetchAssest(event) {
  try {
    const res = await caches.match(event.request)
    const savedRes = res.clone()
    caches.open(CACHE_NAME).then((c) => c.put(event.request, savedRes))
    return res
  } catch {
    console.log("TRYA ERROR")
  }
}

async function onLineResponse(event) {
  const response = await fetch(event.request)
  return response
}

async function cleanupCache() {
  console.log('DELETEING')

  const keys = await caches.keys()
  const keysToDelete = keys.map(
    (key) => key !== CACHE_NAME && caches.delete(key)
  )
  return Promise.all(keysToDelete)
}

self.addEventListener("install", (event) => {
  console.log("[Service worker] Installed!")
  self.skipWaiting()
  event.waitUntil(preCache())
})

self.addEventListener("fetch", function (event) {
  if (navigator.onLine) event.respondWith(onLineResponse(event))
  else event.respondWith(fetchAssest(event))
})

self.addEventListener("activate", async (event) => {
  console.log("[Service worker] Activated!")

  event.waitUntil(cleanupCache())
})
 