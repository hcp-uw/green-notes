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
        editor.execCommand('mceInsertNewLine');
      
        editor.execCommand('mceInsertContent', false, 
          "<div id='creating'></div>"
        );

        let oldDiv = editor.dom.get("creating");
        
        if (oldDiv !== null) {
          let newDiv = document.createElement("div");
          newDiv.className = "ide-div";

          let newPre = document.createElement("pre");

          let newCode = document.createElement("code");
          newCode.className = "ide-code";
          newCode.dataset.lang = "0";
          newCode.id = "active";
          newPre.appendChild(newCode);
          newDiv.appendChild(newPre);

          let newButton = document.createElement("button");
          newButton.textContent = "Run in IDE";
          newButton.className = "run-in-ide-btn";
          newDiv.appendChild(newButton);

          editor.dom.replace(newDiv, oldDiv);
        }

        openNewIDE();
    },
  });
};
