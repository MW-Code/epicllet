export function OpenInternLink(router, URL) {
  // console.log(router.currentRoute.fullPath, payload)
  if (router.currentRoute.fullPath !== URL) {
    router.push(URL);
  }
}

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ router, store } /* { app, router, Vue ... } */) => {
  // something to do
  console.log("Boot Epicllet");
  store.dispatch("InitFirebase", router);
};
