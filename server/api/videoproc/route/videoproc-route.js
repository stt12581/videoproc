import VideoprocController from "../controller/videoproc-controller";

export default class VideoprocRoutes {
  static init(router) {
    router
    .route("/api/upload")
    .post(VideoprocController.uploadImage);

    router
    .route("/api/csrf")
    .get(VideoprocController.getCsrf);
  }
}
