import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce';

export default function TextEditor() {
    const editorRef = useRef(null);
    return (
      <div id="editor-area">
        <Editor 
          tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
          id='editor'
          init={{
            height: "calc(100vh - 105px)",
            resize: false, 
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </div>
    );
}


function editorHeight(): number {
  const area: HTMLElement | null = document.getElementById('editor-area');
  if (area === null) {
    throw new Error("editor-area is null");
  }

  const areaHeight: number = area.offsetHeight;
  const editorHeight: number = areaHeight - 75;
  return editorHeight;
}

function resizeHeight(): void {
  const editor: HTMLElement | null = document.getElementById('editor');
  if (editor === null) {
    throw new Error("tox-tinymce is null");
  }

  editor.style.height = `150px`;
}

document.onload = function () {
  resizeHeight();
};

window.onresize = function(): void {
  resizeHeight();
}
