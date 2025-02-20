class Controls {
  control;
  muteControl;
  pauseControl;
  touchControl;
  fullScreenControl;
  touchscreenControls;
  isFullScreen = false;
  isTouchScreenEnable = false;

  constructor() {
    this.control = document.getElementById("control");
    this.muteControl = document.getElementById("mute-control");
    this.pauseControl = document.getElementById("pause-control");
    this.fullScreenControl = document.getElementById("full-control");
    this.touchControl = document.getElementById("touch-control");
    this.touchscreenControls = document.getElementById("touchscreen-controls");
  }

  hideControlWrapper(){
    this.control.classList.add("d-none");
  }

  showControlWrapper(){
    this.control.classList.remove("d-none");
  }

  toggleMuteControl() {
    this.muteControl.classList.toggle("muted");
  }

  showTouchscreenControls() {
    this.touchControl.classList.add("touched");
    this.touchscreenControls.classList.remove("d-none");
    this.isTouchScreenEnable = true;
  }

  hideTouchscreenControls() {
    this.touchControl.classList.remove("touched");
    this.touchscreenControls.classList.add("d-none");
    this.isTouchScreenEnable = false;
  }

  showFullScreenControl() {
    this.fullScreenControl.classList.remove("d-none");
  }

  changePauseIconToPaused() {
    this.pauseControl.classList.add("paused");
  }
  
  changePauseIconToResume() {
    this.pauseControl.classList.remove("paused");
  }
  
  enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
    canvans.classList.add('fullscreen');
    this.fullScreenControl.classList.add('fulled');
    this.isFullScreen = true;
  }
  
  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    canvans.classList.remove('fullscreen');
    this.fullScreenControl.classList.remove('fulled');
    this.isFullScreen = false;
  }
}
