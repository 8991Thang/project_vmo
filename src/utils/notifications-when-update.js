import { Alert } from "react-st-modal";
import { checkStatusResponse } from "./check-status-call-api";
export const notifyUpdate = async (status, redirectRouter, link) => {
  if (status === null) return;
  await Alert(checkStatusResponse(status).message, "Notifications!!");
  if (checkStatusResponse(status).redirect) {
    await redirectRouter.push(checkStatusResponse(status).redirect);
    return;
  }
  if (checkStatusResponse(status).done) redirectRouter.push(link);
};
