import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor() {
    const editorRef = useRef(null);
    return (
      <div id="editor-area">
        <Editor 
          tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
          init={{
            height: 470,
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
