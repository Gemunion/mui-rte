import { EditorState } from "draft-js";
import { InvertColors } from "@mui/icons-material";
import { Meta, StoryObj } from "@storybook/react";

import { RichTextEditor } from "../../src";
import { MyCallbackComponent } from "./callback-component";
import { ClearComponent } from "./clear-component";
import { MyBlockComponent } from "./block-component";
import { MyBlock } from "./block";

export default {
  title: "Custom Controls",
} as Meta<typeof RichTextEditor>;

type Story = StoryObj<typeof RichTextEditor>;

const save = (data: string) => {
  console.info(data);
};

const Template: Story = {
  render: args => {
    return (
      <RichTextEditor
        label="Type something here..."
        controls={["title", "bold", "my-block", "my-style", "clear", "my-callback", "clear-callback", "save"]}
        customControls={[
          {
            name: "my-style",
            icon: <InvertColors />,
            type: "inline",
            inlineStyle: {
              backgroundColor: "black",
              color: "white",
            },
          },
          {
            name: "my-block",
            component: MyBlockComponent,
            type: "block",
            blockWrapper: <MyBlock />,
          },
          {
            name: "my-callback",
            component: MyCallbackComponent,
            type: "callback",
            onClick: (_editorState, name, _anchor) => {
              console.info(`Clicked ${name} control`);
            },
          },
          {
            name: "clear-callback",
            component: ClearComponent,
            type: "callback",
            onClick: () => {
              return EditorState.createEmpty();
            },
          },
        ]}
        onSave={save}
        {...args}
      />
    );
  },
};

export const CustomControls = Template;
