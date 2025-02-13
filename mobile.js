let highestZ = 1;

class Paper {
  holdingPaper = false;
  rotating = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener('touchstart', (e) => this.onTouchStart(e, paper), { passive: false });
    paper.addEventListener('touchmove', (e) => this.onTouchMove(e, paper), { passive: false });
    paper.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: false });
    paper.addEventListener('gesturestart', (e) => this.onGestureStart(e), { passive: false });
    paper.addEventListener('gesturechange', (e) => this.onGestureChange(e, paper), { passive: false });
    paper.addEventListener('gestureend', (e) => this.onGestureEnd(e), { passive: false });
  }

  onTouchStart(e, paper) {
    if (this.holdingPaper) return;
    
    this.holdingPaper = true;
    paper.style.zIndex = highestZ++;
    
    const touch = e.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.prevTouchX = this.touchStartX;
    this.prevTouchY = this.touchStartY;
  }

  onTouchMove(e, paper) {
    e.preventDefault(); // Prevents unwanted scrolling
    if (!this.holdingPaper) return;
    
    const touch = e.touches[0];
    
    if (!this.rotating) {
      this.velX = touch.clientX - this.prevTouchX;
      this.velY = touch.clientY - this.prevTouchY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevTouchX = touch.clientX;
      this.prevTouchY = touch.clientY;
    }

    paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
  }

  onTouchEnd() {
    this.holdingPaper = false;
    this.rotating = false;
  }

  onGestureStart(e) {
    e.preventDefault();
    this.rotating = true;
  }

  onGestureChange(e, paper) {
    e.preventDefault();
    this.rotation = e.rotation;
    paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
  }

  onGestureEnd(e) {
    e.preventDefault();
    this.rotating = false;
  }
}

document.querySelectorAll('.paper').forEach(paper => new Paper().init(paper));


