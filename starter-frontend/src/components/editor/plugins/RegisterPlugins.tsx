import { Editor } from "tinymce";
import IDEPlugin from "./IDEPlugin";

type PluginRegistrationProps = {
  editor: Editor;
};

export default function RegisterPlugins({ editor }: PluginRegistrationProps) {
  IDEPlugin({ editor }); 
};
