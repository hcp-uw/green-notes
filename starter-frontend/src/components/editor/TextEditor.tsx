import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

export default function TextEditor({initContent} : {initContent: string}) {
    const editorRef = useRef<TinyMCEEditor | null>(null);

    const [content, setContent] = useState<string>(initContent);

    return (
      <div id="editor-area">
        <form>
        <Editor 
          initialValue={content}
          tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
          id='editor'
          onInit={(_evt, editor) => {editorRef.current = editor}}
          init={{ 
            height: "calc(100vh - 105px)",
            licenseKey: 'gpl', 
            resize: false, 
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'save'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help | save',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }', 
            save_onsavecallback: (): void => {
              save(setContent, editorRef)
            }
          }}
        />
        </form>
      </div>
    );
}


/** Saves current text in the editor. 
 * TO-DO: Implement.
 */
function save(setContent: (newContent: string) => void, editorRef: React.RefObject<TinyMCEEditor>): void {
  if (editorRef.current !== null) {
    const content = editorRef.current.getContent();
    setContent(content);
    console.log(content);
  }
}
