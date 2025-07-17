import { Container, Graphics, HTMLText } from "pixi.js";
import { PhotoSplashScreen } from "./splash/PhotoSplashScreen";
import LoaderUI from "./onBoardingHcUi/LoaderUI";

export default class HabboLoadingScreen extends Container {

  private _S1O = 0;
  private _s1x: string | null = null;
  private _lX: number = 0;
  private _Q1 = 0;
  private _C14 = false;

  constructor(param1: number, param2: number, param3: Object) {
    super();

    let _loc14_ = new Graphics();
    _loc14_.name = "background";
    _loc14_.clear();
    _loc14_.rect(0, 0, param1, param2);
    _loc14_.fill(922908);
    this.addChild(_loc14_);
    let _Ta = new PhotoSplashScreen(this);
    _Ta.name = "photoSplashScreen";
    this.addChild(_Ta);
    let _loc5_ = new Graphics();
    _loc5_.name = "fileLoadingBar";
    // TOP
    _loc5_.moveTo(1, 0);
    _loc5_.lineTo(400, 0);

    // RIGHT
    _loc5_.moveTo(401, 1);
    _loc5_.lineTo(401, 25);

    // BOTTOM
    _loc5_.moveTo(1, 25);
    _loc5_.lineTo(400, 25);

    // LEFT
    _loc5_.moveTo(1, 1);
    _loc5_.lineTo(1, 25);
    _loc5_.stroke({
      width: 1,
      color: 16777215,
      alpha: 1
    });
    this.addChild(_loc5_);
    // var _loc10_: String = _localization.getLocalization("client.starting.revolving");
    // var _loc4_: String = _localization.getLocalization("client.starting");
    let _loc10_ = "For science, you monster/Loading funny message…please wait./Would you like fries with that?/Follow the yellow duck./Time is just an illusion./Are we there yet?!/I like your t-shirt./Look left. Look right. Blink twice. Ta da!/It's not you, it's me./Shhh! I'm trying to think here./Loading pixel universe.";
    let _loc4_ = "My dog is The Ruler of this World.";
    let _loc11_: any = null;
    if (_loc10_ != null) {
      const _loc9_ = _loc10_.split("/");
      this._S1O = this.randomNumber(0, _loc9_.length - 1);
      this._s1x = _loc10_;
      _loc11_ = _loc9_[this._S1O];
    }
    else {
      _loc11_ = _loc4_;
    }
    let _loc6_ = LoaderUI.createTextField(_loc11_, 28, 16777215, true, false, false, false, "center");
    _loc6_.name = "textField";
    this.addChild(_loc6_);
    let _loc7_ = LoaderUI.createTextField("0%", 14, 10066329, true, false, false, false, "center");
    _loc7_.name = "loadingNumberTextField";
    this.addChild(_loc7_);
    let _loc13_ = new Graphics();
    _loc13_.name = "fileBarSprite";
    _loc5_.addChild(_loc13_);
    _loc5_.visible = true;
    // var _loc12_: XML = NativeApplication.nativeApplication.applicationDescriptor;
    // var _loc8_: Namespace = _loc12_.namespace();
    // var _loc16_: String = _loc12_._loc8_:: versionNumber;
    var _loc16_ = "1.0.31";
    var _loc15_ = LoaderUI.createTextField(_loc16_, 12, 10066329, true, false, false, false, "right");
    _loc15_.name = "versionTextField";
    this.addChild(_loc15_);
    this.once("added", this.onAddedToStage, this);
  }

  private onAddedToStage(): void {
    // stage.addEventListener("resize", onResize);
    this.positionLoadingScreenDisplayElements();
    setInterval(this.onBarProgressEvent.bind(this), 750);
  }

  private onBarProgressEvent(): void {
    let _loc4_: string[] | null = null;
    let _loc2_: HTMLText | null = null;
    let _loc3_: HTMLText | null = null;
    if (this._Q1 == 100) {
      if (this._C14) {
        _loc4_ = this._s1x!.split("/");
        _loc2_ = this.getChildByName("textField") as HTMLText;
        if (_loc2_ != null) {
          this.removeChild(_loc2_)
          _loc3_ = LoaderUI.createTextField(_loc4_[this._S1O], 28, 16777215, true, false, false, false, "center");
          _loc3_.x = (this.width - _loc3_.width) / 2;
          _loc3_.y = _loc2_.y;
          _loc3_.name = "textField";
          this.addChild(_loc3_);
        }
        this._C14 = false;
      }
      this._Q1 = 0;
    }
    else {
      this._Q1 += Math.min(this.randomNumber(35, Math.min(this.randomNumber(45, 55))), 100 - this._Q1);
    }
    if (this._Q1 == 100 && this._s1x != null) {
      this._C14 = true;
      this._S1O = (this._S1O + 1) % (this._s1x.split("/").length - 1);
    }
    this.updateLoadingBarProgression(this._Q1 / 100);
  }

  private randomNumber(param1: number, param2: number): number {
    return Math.floor(Math.random() * (param2 - param1 + 1)) + param1;
  }

  public positionLoadingScreenDisplayElements(): void {
    var _loc11_ = 0;
    var _loc14_ = 0;
    // var _loc8_: Stage = this.stage;
    // if (_loc8_ != null) {
    //   _loc11_ = _loc8_.stageWidth;
    //   _loc14_ = _loc8_.stageHeight;
    // }
    // else {
    _loc11_ = this.width;
    _loc14_ = this.height;
    // }
    var _loc9_ = this.getChildByName("background") as Graphics;
    if (_loc9_ != null) {
      _loc9_.x = 0;
      _loc9_.y = 0;
      _loc9_.clear();
      _loc9_.rect(0, 0, _loc11_, _loc14_);
      _loc9_.fill(922908);
    }
    var _loc15_ = 0;
    var _loc6_ = 0;
    var _loc12_ = 0;
    var _loc4_ = 0;
    var _loc1_ = 0;
    var _loc3_ = 10;
    var _loc7_ = this.getChildByName("photoSplashScreen") as PhotoSplashScreen;
    if (_loc7_ != null) {
      _loc7_.x = (_loc11_ - _loc7_.width) / 2;
      _loc1_ = _loc7_.y + _loc7_.height;
    }
    var _loc5_ = this.getChildByName("textField") as HTMLText;
    if (_loc5_ != null) {
      _loc5_.x = (_loc11_ - _loc5_.width) / 2;
      if (_loc5_.width > _loc12_) {
        _loc12_ = _loc5_.width;
        _loc15_ = _loc5_.x;
      }
    }
    var _loc2_ = this.getChildByName("versionTextField") as HTMLText;
    if (_loc2_ != null) {
      _loc2_.x = _loc11_ - _loc2_.width;
      _loc2_.y = 0;
    }
    var _loc13_ = this.getChildByName("fileLoadingBar") as Graphics;
    if (_loc13_ != null) {
      _loc13_.x = Math.floor((_loc11_ - _loc13_.width) / 2);
      _loc13_.y = Math.floor(_loc1_);
      _loc1_ = _loc13_.y + _loc13_.height;
      if (_loc13_.width > _loc12_) {
        _loc12_ = _loc13_.width;
        _loc15_ = _loc13_.x;
      }
    }
    var _loc10_ = this.getChildByName("loadingNumberTextField") as HTMLText;
    if (_loc10_ != null) {
      _loc10_.x = (_loc11_ - _loc10_.width) / 2;
      if (_loc10_.width > _loc12_) {
        _loc12_ = _loc10_.width;
        _loc15_ = _loc10_.x;
      }
    }
    _loc1_ = (_loc14_ - _loc1_) / 2;
    _loc1_ -= _loc3_ * 2;
    if (_loc7_ != null) {
      _loc7_.y = _loc1_;
      _loc1_ = _loc7_.y + _loc7_.height;
    }
    if (_loc5_ != null) {
      _loc5_.y = _loc1_ + 50;
      _loc1_ = _loc5_.y + _loc5_.height + _loc3_;
    }
    if (_loc13_ != null) {
      _loc13_.y = Math.floor(_loc1_);
      _loc1_ = _loc13_.y + _loc13_.height + _loc3_ / 2;
    }
    if (_loc10_ != null) {
      _loc10_.y = _loc1_;
    }
  }

  public updateLoadingBarProgression(param1: number): void {
    let _loc6_ = 400;
    let _loc9_ = 25;
    let _loc5_ = 2;
    let _loc3_ = 2;
    let _loc8_ = this.getChildByName("fileLoadingBar") as Graphics;
    if (_loc8_ == null) {
      return;
    }
    let _loc7_ = _loc8_.getChildByName("fileBarSprite") as Graphics;
    if (_loc7_ == null) {
      return;
    }
    _loc7_.x = _loc5_ + _loc3_;
    _loc7_.y = _loc5_ + _loc3_;
    _loc7_.clear();
    let _loc4_ = _loc9_ - _loc5_ * 2 - _loc3_ * 2;
    let _loc2_ = (_loc6_ - _loc5_ * 2 - _loc3_ * 2) * param1;
    _loc7_.rect(-1, -1, _loc6_ - _loc5_ * 2, _loc9_ - _loc3_ * 2);
    _loc7_.fill(0);
    _loc7_.rect(0, 0, _loc2_, _loc4_ / 2);
    _loc7_.fill(12241619);
    _loc7_.rect(0, _loc4_ / 2, _loc2_, _loc4_ / 2 + 1);
    _loc7_.fill(9216429);
  }
}

// 0E151C
// 0E151C