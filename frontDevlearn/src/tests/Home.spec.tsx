import React from "react";
import { render } from "@testing-library/react";
import { Home } from "../pages/Home";

describe("<Home />", () => {
  it("should render the home page", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
