import { configure, addParameters, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

addDecorator(withKnobs);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  //Taken from Next JS with-storybook-typescript example
  options: {
    storySort: (a, b) => {
      // We want the Welcome story at the top
      if (a[1].kind === "Welcome") {
        return -1;
      }

      // Sort the other stories by ID
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true });
    },
  },
});

// automatically import all files ending in *.stories.(ts|tsx)
const req = require.context(" ", true, /\.stories\.tsx?$/);

// the first argument can be an array too, so if you want to load from different locations or
// different extensions, you can do it like this: configure([req1, req2], module)
configure(req, module);
