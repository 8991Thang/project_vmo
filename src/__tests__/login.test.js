import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { FormLogin } from "../modules/login/components/form-login";

describe("Login module", () => {
  it("renders login form", () => {
    render(
      <Provider store={store}>
        <FormLogin />
      </Provider>,
    );
  });
});
