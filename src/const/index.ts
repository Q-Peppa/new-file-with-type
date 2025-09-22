import path from "path";
import { QuickPickItem, Uri } from "vscode";

interface F extends QuickPickItem {
    id: string;
}
const JAVASCRIPT  = [
   { label : "JavaScript File", description: "" , id: "js", iconPath: Uri.file(path.resolve(__filename, "../../../icons/js.svg")) },
   { label: "JSX File", description: "" , id: "jsx" , iconPath: Uri.file(path.resolve(__filename, "../../../icons/react.svg"))  },
] as F[];


const TYPESCRIPT = [
   { label : "TypeScript File", description: "" , id: "ts", iconPath: Uri.file(path.resolve(__filename, "../../../icons/ts.svg")) },
   { label: "TSX File", description: "" , id: "tsx" , iconPath: Uri.file(path.resolve(__filename, "../../../icons/react.svg")) },
] as F[];

const STYLE_SHEET = [
  {
    label: "CSS File",
    description: "",
    id: "css",
    iconPath: Uri.file(path.resolve(__filename, "../../../icons/css.svg"))
  },
  {
    label: "SCSS File",
    description: "",
    id: "scss",
    iconPath: Uri.file(path.resolve(__filename, "../../../icons/scss.svg"))
  },
  {
    label: "LESS File",
    description: "",
    id: "less",
    iconPath: Uri.file(path.resolve(__filename, "../../../icons/less.svg"))
  },
  {
    label: "Stylus File",
    description: "",
    id: "stylus",
    iconPath: Uri.file(path.resolve(__filename, "../../../icons/stylus.svg"))
  },
  {
    label: "Sass File",
    description: "",
    id: "sass",
    iconPath: Uri.file(path.resolve(__filename, "../../../icons/sass.svg"))
  }
] as F[];

const HTML = [
  {
    label: "HTML File",
    description: "",
    id: "html",
    iconPath: Uri.file(path.resolve(__filename, "../../../icons/html.svg"))
  },
] as F[];

export default {
  JAVASCRIPT: JAVASCRIPT,
  TYPESCRIPT: TYPESCRIPT,
  "STYLE SHEET": STYLE_SHEET,
  HTML: HTML,
  FILE: [] as F[],
  FOLDER: [] as F[],
};
