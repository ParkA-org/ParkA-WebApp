
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import Button from ".";

export default { title: "Button" };

export const withText = () => (
  <Button onClick={action("clicked")}>{text("Content", "Hello Button")}</Button>
);

export const withSomeEmoji = () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
