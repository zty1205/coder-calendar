type TimeLoopHookName = "start" | "process" | "paused" | "finished";
type TimeLoopHook = (loop: TimeLoop) => void;

export class TimeLoop {
  timer: NodeJS.Timeout | undefined;
  total: number;
  count: number;
  step: number;
  hooks: Map<TimeLoopHookName, TimeLoopHook>;
  constructor(total: number, step: number, processHook?: TimeLoopHook) {
    this.total = total;
    this.count = 0;
    this.step = step;
    if (processHook) {
      this.hooks = new Map([["process", processHook]]);
    } else {
      this.hooks = new Map()
    }
  }
  setStep(step: number) {
    if (this.step === step) return
    this.step = step
  }
  registerHooks(name: TimeLoopHookName, hook: TimeLoopHook) {
    this.hooks.set(name, hook);
  }
  triggerHooks(name: TimeLoopHookName) {
    if (this.hooks.has(name)) {
      const fn = this.hooks.get(name);
      fn && fn(this);
    }
  }
  start() {
    this.count = 0;
    this.triggerHooks("start");
    this.running();
  }
  running() {
    this.count+=1;
    this.triggerHooks("process");
    if (this.count >= this.total) {
      clearTimeout(this.timer);
      this.triggerHooks("finished");
    } else {
      this.timer = setTimeout(() => {
        this.running()
      }, this.step);
    }
  }
  pause() {
    clearTimeout(this.timer);
  }
  continue() {
    this.running();
  }
  // 提前结束
  stop() {
    clearTimeout(this.timer);
    this.triggerHooks("finished");
  }
  destroy() {
    clearTimeout(this.timer);
    this.hooks = new Map();
  }
}