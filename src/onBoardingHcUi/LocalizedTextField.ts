import { Text, HTMLText } from "pixi.js";
import type ILocalizable from "../com/sulake/core/localization/ILocalizable";


export default class LocalizedTextField extends HTMLText implements ILocalizable {
  
  set localization(text: String) {
    super.text = text;
  }

}