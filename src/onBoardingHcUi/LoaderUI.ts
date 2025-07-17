import { TextStyle, type HTMLText, type TextStyleAlign } from "pixi.js";
import LocalizedTextField from "./LocalizedTextField";


export default class LoaderUI {
  public static createTextField(param1: string, param2: number, param3: number, param4 = false, param5 = false, param6 = false, param7 = false, param8: TextStyleAlign = "left", param9 = false, param10 = false): HTMLText {
    var _loc11_ = new TextStyle({
      fontFamily: "Ubuntu",
      fontSize: param2,
      fill: param3,
      fontWeight: param4 ? "bold" : "normal",
      fontStyle: param7 ? "italic" : "normal",
      align: param8,
    });
    // _loc11_.kerning = param9;
    let _loc12_ = new LocalizedTextField();
    // _loc12_.embedFonts = true;
    // _loc12_.antiAliasType = "advanced";
    _loc12_.style = _loc11_;
    // _loc12_.multiline = param5;
    _loc12_.style.wordWrap = param5;
    // _loc12_.type = param6 ? "input" : "dynamic";
    // _loc12_.selectable = param6;
    _loc12_.text = param1;
    // _loc12_.autoSize = "left";
    // _loc12_.width = _loc12_.textWidth;
    // _loc12_.height = _loc12_.textHeight;
    return _loc12_;
  }
}