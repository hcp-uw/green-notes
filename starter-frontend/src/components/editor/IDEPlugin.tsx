// TinyMCE React Plugin: https://stackoverflow.com/a/77054502

import { Editor } from "tinymce";

type PluginRegistrationProps = {
  editor: Editor, 
  openNewIDE: () => void
};

export default function IDEPlugin({editor, openNewIDE}: PluginRegistrationProps) {
  editor.ui.registry.addButton("ide", {
    text: "IDE",
    icon: "sourcecode", 
    onAction: function () {
        editor.execCommand('mceInsertContent', false, 
          "<br><code className='active' id='l0'><\code><br><button onClick={openIDE}>Run in IDE</button><br>"
        );
        openNewIDE();
    },
  });
};
