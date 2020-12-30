import { ModalWarning } from "../components/modal/modal-warning";
import { NotificationError } from "../components/notification/notification-error";
import { NotificationInvalid } from "../components/notification/notification-invalid";
import { NotificationSuccess } from "../components/notification/notification-success";

export const checkStatusResponse = status => {
  if (status === null) return;
  switch (status) {
    case 404:
      return <NotificationInvalid />;
    case 500:
      return <NotificationError />;
    case 400:
      return <NotificationError />;

    case 401: {
      return <ModalWarning />;
    }
    case 200:
      return <NotificationSuccess />;
  }
};
