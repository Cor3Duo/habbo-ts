import { Container } from "pixi.js";
import DomainLock from "./DomainLock";


export default class HabboAir extends Container {

  constructor() {
    super();

    var _loc1_ = new DomainLock();
    if (!_loc1_.validateLocation(this))
    {
      return;
    }
    console.log("PASSOU PORRA!");
    // _startTime = getTimer();
    // stop();
    //      §_ - k15§ = new Dictionary();
    // if (stage) {
    //   onAddedToStage();
    // }
    // else {
    //   this.addEventListener("addedToStage", onAddedToStage);
    // }
    // NativeApplication.nativeApplication.addEventListener("invoke", onInvoke);
    // NativeApplication.nativeApplication.addEventListener("browserInvoke", onBrowserInvoke);
  }

}