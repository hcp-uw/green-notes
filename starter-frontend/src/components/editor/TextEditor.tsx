import React, { useCallback, useRef, useState } from 'react';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { auth } from '../../config/firebase';
import { FetchRoute } from '../file-navigation/routes';
import RegisterPlugins from './plugins/RegisterPlugins';

type TextEditorProps = {
  initContent: string,
  eRoute: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrContent:  React.Dispatch<React.SetStateAction<string>>, 
  setupEditor?: (e: TinyMCEEditor) => void
} & Partial<IAllProps>;

export default function TextEditor({initContent, eRoute, setIsLoading, setCurrContent, setupEditor, init = {}, ...rest} : TextEditorProps) {
    const editorRef = useRef<TinyMCEEditor | null>(null);

    const [content, setContent] = useState<string>(initContent);

    const setup = useCallback((editor: TinyMCEEditor) => {
      RegisterPlugins( {editor} );
      setupEditor && setupEditor(editor);
    }, []);

    return (
      <div id="editor-area">
        <form>
        <Editor 
          initialValue={content}
          tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
          id='editor'
          licenseKey="gpl"
          onInit={(_evt, editor) => {editorRef.current = editor}}
          init={{ 
            height: "calc(100vh - 105px)",
            width: "auto",
            resize: false, 
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 
              'save'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help | save | ide',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }', 
            save_onsavecallback: (): void => {
              save(setContent, editorRef, eRoute, setIsLoading, setCurrContent)
            }, 
            setup, 
            ...init,
          }}
        />
        </form>
      </div>
    );
}


/** Saves current text in the editor. 
 * TO-DO: Implement.
 */
function save(setContent: React.Dispatch<React.SetStateAction<string>>, editorRef: React.RefObject<TinyMCEEditor>, eRoute: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
              setCurrContent: React.Dispatch<React.SetStateAction<string>>): void {
  if (editorRef.current !== null) {
    const content = editorRef.current.getContent();
    setContent(content);
    setCurrContent(content);
    doSave(content, eRoute, setIsLoading, setContent, setCurrContent);
    
  }
}

const doSave = async (content: string, route: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                      setContent: React.Dispatch<React.SetStateAction<string>>, setCurrContent: React.Dispatch<React.SetStateAction<string>>): Promise<void> => {
  try {
    setIsLoading(true);
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const body = {
        route: route,
        content: content
    }

    const payloadHeader = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(body)
    };


    // Fetches the /getFolderContents. The string in the encodeURIComponent is the route
    // and the payload header is necessary stuff for server authentication
    fetch(FetchRoute+"/saveDoc", payloadHeader)
        .then(() => {
          setContent(content);
          setCurrContent(content);
          setIsLoading(false);
          console.log("updated");})
        .catch(() => console.error("Error fetching /saveDoc: Failed to connect to server"));
    

  } catch (e) {
    setIsLoading(false);
    console.log(e);
  }
}
