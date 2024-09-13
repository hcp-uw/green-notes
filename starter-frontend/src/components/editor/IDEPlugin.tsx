// TinyMCE React Plugin: https://stackoverflow.com/a/77054502

import React from "react";
import { Editor } from "tinymce";

type PluginRegistrationProps = {
  editor: Editor, 
  openIDE: (this: HTMLButtonElement, ev: MouseEvent) => void,
  openNewIDE: () => void
};

export default function IDEPlugin({editor, openIDE, openNewIDE}: PluginRegistrationProps) {
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

          let newCode = document.createElement("code");
          newCode.dataset.lang = "0";
          newCode.id = "active";
          newDiv.appendChild(newCode);

          let newBreak = document.createElement("br");
          newDiv.appendChild(newBreak);

          let newButton = document.createElement("button");
          newButton.textContent = "Run in IDE";
          newButton.addEventListener("click", openIDE);
          newDiv.appendChild(newButton);

          editor.dom.replace(newDiv, oldDiv);
        }
        // editor.execCommand('mceInsertContent', false, newCont
        //   // "<br><code data-language='0' id='active'></code><br><button onClick='openIDE()'>Run in IDE</button><br>"
        // );

        openNewIDE();
    },
  });
};