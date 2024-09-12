// TinyMCE React Plugin: https://stackoverflow.com/a/77054502

import { Editor } from "tinymce";

type PluginRegistrationProps = {
  editor: Editor;
};

export default function IDEPlugin({editor}: PluginRegistrationProps) {
  editor.ui.registry.addButton("ide", {
    text: "IDE",
    icon: "sourcecode", 
    onAction: function () {
        editor.execCommand('mceInsertContent', false, "some text");
    },
  });
};
