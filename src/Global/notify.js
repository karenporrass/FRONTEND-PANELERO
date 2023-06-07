import { Notify } from "quasar";

export const notifyError = (msg, position = "top") => {
  Notify.create({
    color: "negative",
    message: msg,
    icon: "error",
    position: position,
    timeout: 2500,
  });
};

export const notifySuccess = (msg, position = "top") => {
  Notify.create({
    color: "positive",
    message: msg,
    icon: "check",
    position: position,
    timeout: 2500,
  });
};
