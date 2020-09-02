
import { render } from "@testing-library/react";
import Index from "../pages/index";

test("renders welcome message", () => {
  const { getByText } = render(<Index />);
  const linkElement = getByText(/Index/);
  expect(linkElement).toBeInTheDocument();
});
