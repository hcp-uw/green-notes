// TinyMCE React Plugin: https://stackoverflow.com/a/77054502

import React, { useCallback, useRef, useState } from 'react';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { auth } from '../../config/firebase';
import { FetchRoute } from '../file-navigation/routes';
import IDEPlugin from './IDEPlugin';

type TextEditorProps = {
  editorRef: React.Ref<TinyMCEEditor | null>,
  initContent: string,
  eRoute: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrContent:  React.Dispatch<React.SetStateAction<string>>, 
  openIDE: (this: HTMLButtonElement, ev: MouseEvent) => void,
  openNewIDE: () => void,
  setupEditor?: (e: TinyMCEEditor) => void
} & Partial<IAllProps>;

export default function TextEditor({editorRef, initContent, eRoute, setIsLoading, setCurrContent, openIDE, openNewIDE, setupEditor, init = {}, ...rest} : TextEditorProps) {
    // const editorRef = useRef<TinyMCEEditor | null>(null);

    const [content, setContent] = useState<string>(initContent);

    const setup = useCallback((editor: TinyMCEEditor) => {
      IDEPlugin( {editor, openNewIDE} );
      setupEditor && setupEditor(editor);
    }, []);

    


    return (
      <div id="editor-area">
        <form>
        <Editor 
          initialValue={"<div id='placement'></div>" + content}
          tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
          id='editor'
          licenseKey="gpl"
          // @ts-ignore
          onInit={(_evt, editor) => {editorRef.current = editor; 
            setupIDEButtons(openIDE, editorRef);
          }}
          init={{ 
            height: "calc(96vh - 105px)",
            width: "auto",
            resize: false, 
            menubar: false,
            extended_valid_elements: 'button[class|className|onClick|onclick|classname]',
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
              // @ts-ignore
              save(setContent, editorRef, eRoute, setIsLoading, setCurrContent, openIDE)
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
              setCurrContent: React.Dispatch<React.SetStateAction<string>>, openIDE: (this: HTMLButtonElement, ev: MouseEvent) => void): void {
  if (editorRef.current !== null) {
    const content = editorRef.current.getContent();
    setContent(content);
    setCurrContent(content);
    doSave(content, eRoute, setIsLoading, setContent, setCurrContent);
    
    setupIDEButtons(openIDE, editorRef);
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


// @ts-ignore
function setupIDEButtons(openIDE, editorRef): void {
  editorRef.current.dom.getRoot().addEventListener("click", openIDE);
}
