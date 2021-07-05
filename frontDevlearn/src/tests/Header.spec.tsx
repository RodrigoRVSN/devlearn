import React from "react";
import { render } from "@testing-library/react";
import Header from "../components/Header";

describe("<Header />", () => {
  it("should render the header", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
