import { haptics } from './haptics';

// Web Audio API micro-sound engine with distinct tactile synthesized UI cues

class SoundSystem {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.28;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    this.isMuted = false;
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('st_sound_muted');
      } catch {
        // LocalStorage fallback
      }
      this.attachGlobalInteractions();
    }
  }

  // Bind interaction listeners to unlock AudioContext and trigger contextual sound cues
  private attachGlobalInteractions() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      this.resume();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true, capture: true });
    window.addEventListener('touchstart', unlock, { passive: true, capture: true });
    window.addEventListener('keydown', unlock, { passive: true, capture: true });

    // Global click listener mapping clickable element types to distinct sound profiles
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest(
        'button, a, [role="button"], [role="tab"], input[type="submit"], input[type="button"], [data-clickable]'
      ) as HTMLElement | null;

      if (!clickable) return;

      const href = (clickable.getAttribute('href') || '').toLowerCase();
      const ariaLabel = (clickable.getAttribute('aria-label') || '').toLowerCase();
      const text = (clickable.innerText || clickable.textContent || '').toLowerCase();
      const className = (clickable.className || '').toString().toLowerCase();

      // 1. WhatsApp Action
      if (href.includes('wa.me') || href.includes('whatsapp') || className.includes('whatsapp') || ariaLabel.includes('whatsapp') || text.includes('whatsapp')) {
        this.playWhatsApp();
        return;
      }

      // 2. Telephone Call Action
      if (href.startsWith('tel:') || ariaLabel.includes('call') || text.includes('call ')) {
        this.playCall();
        return;
      }

      // 3. Modal Close / Dismiss
      if (ariaLabel.includes('close') || ariaLabel.includes('dismiss') || className.includes('close')) {
        this.playClose();
        return;
      }

      // 4. Copy Code / Text Action
      if (ariaLabel.includes('copy') || text.includes('copy') || text.includes('code:')) {
        this.playCopy();
        return;
      }

      // 5. Tabs / Segmented Switcher
      if (clickable.getAttribute('role') === 'tab' || className.includes('tab') || clickable.hasAttribute('aria-pressed')) {
        this.playTab();
        return;
      }

      // 6. Accordion / FAQ Toggle
      if (clickable.tagName.toLowerCase() === 'summary' || className.includes('faq') || className.includes('accordion')) {
        this.playAccordion();
        return;
      }

      // 7. Vehicle Selector
      if (ariaLabel.includes('vehicle') || text.includes('dzire') || text.includes('ertiga') || text.includes('innova')) {
        this.playCarSelect();
        return;
      }

      // 8. Route / Corridor Selector
      if (ariaLabel.includes('route') || text.includes('airport') || text.includes('puri') || text.includes('daringbadi')) {
        this.playRouteSelect();
        return;
      }

      // 9. Primary Booking / Reservation CTA
      if (text.includes('book') || text.includes('reserve') || className.includes('book-cab')) {
        this.playTap();
        haptics.impactHeavy();
        return;
      }

      // Default tactile tap
      this.playTap();
    };

    // Form input focus listener for soft micro-blip
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'select' || tag === 'textarea') {
        this.playInputFocus();
      }
    };

    window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
    window.addEventListener('focusin', handleFocusIn, { capture: true, passive: true });
  }

  public resume() {
    const ctx = this.getContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.audioCtx) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      return this.audioCtx;
    } catch {
      return null;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.listeners.forEach((fn) => fn(this.isMuted));
    if (!this.isMuted) {
      this.playTap();
    }
    return this.isMuted;
  }

  public subscribe(fn: (muted: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  // 1. Crisp tactile micro-tap for general buttons
  public playTap() {
    haptics.tap();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.024);

      gain.gain.setValueAtTime(this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.028);
    } catch {
      // Audio catch
    }
  }

  // 2. Buoyant bubble pop for opening modals and drawers
  public playPop() {
    haptics.pop();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.055);

      gain.gain.setValueAtTime(this.volume * 0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio catch
    }
  }

  // 3. Gentle downward swoosh for modal close and dismiss
  public playClose() {
    haptics.close();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.045);

      gain.gain.setValueAtTime(this.volume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio catch
    }
  }

  // 4. Harmonic triad chime for successful booking and actions
  public playSuccess() {
    haptics.success();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(this.volume * 0.8, noteStart + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.25);
      });
    } catch {
      // Audio catch
    }
  }

  // 5. Snappy mechanical toggle tick for segmented controls
  public playSwitch() {
    haptics.switch();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.018);

      gain.gain.setValueAtTime(this.volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // Audio catch
    }
  }

  // 6. Dynamic dual-frequency acceleration whoosh for car model selection
  public playCarSelect() {
    haptics.carSelect();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.07);

      gain.gain.setValueAtTime(this.volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.075);
    } catch {
      // Audio catch
    }
  }

  // 7. Precise highway compass sonar ping for route selection
  public playRouteSelect() {
    haptics.routeSelect();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.04);

      gain.gain.setValueAtTime(this.volume * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio catch
    }
  }

  // 8. Metallic slide tick for tab navigation
  public playTab() {
    haptics.tab();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.02);

      gain.gain.setValueAtTime(this.volume * 0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Audio catch
    }
  }

  // 9. Warm organic double droplet for WhatsApp desk interactions
  public playWhatsApp() {
    haptics.whatsapp();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [0, 0.05].forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + offset;
        const freq = idx === 0 ? 540 : 720;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(freq + 180, start + 0.035);

        gain.gain.setValueAtTime(this.volume * 0.75, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.045);
      });
    } catch {
      // Audio catch
    }
  }

  // 10. Crisp telephonic double-chirp tone for phone call actions
  public playCall() {
    haptics.call();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [0, 0.06].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + offset;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, start);
        osc.frequency.setValueAtTime(1000, start + 0.02);

        gain.gain.setValueAtTime(this.volume * 0.6, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.045);
      });
    } catch {
      // Audio catch
    }
  }

  // 11. Mechanical double-click for copying promo codes
  public playCopy() {
    haptics.copy();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [0, 0.04].forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + offset;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(idx === 0 ? 1200 : 1600, start);

        gain.gain.setValueAtTime(this.volume * 0.7, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.025);
      });
    } catch {
      // Audio catch
    }
  }

  // 12. Soft mechanical slide for region and corridor filters
  public playFilter() {
    haptics.filter();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.03);

      gain.gain.setValueAtTime(this.volume * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio catch
    }
  }

  // 13. Warm hollow wooden toggle click for FAQ accordion
  public playAccordion() {
    haptics.accordion();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.035);

      gain.gain.setValueAtTime(this.volume * 0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio catch
    }
  }

  // 14. Delicate micro-blip when focusing input fields
  public playInputFocus() {
    haptics.inputFocus();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, now);
      gain.gain.setValueAtTime(this.volume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.018);
    } catch {
      // Audio catch
    }
  }

  // 15. Subtle low double-thud for validation alert
  public playError() {
    haptics.error();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [0, 0.06].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + offset;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, start);
        osc.frequency.exponentialRampToValueAtTime(110, start + 0.035);

        gain.gain.setValueAtTime(this.volume * 0.6, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.045);
      });
    } catch {
      // Audio catch
    }
  }

  // 16. Gentle brush-away sound for clearing search queries
  public playClear() {
    haptics.clear();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

      gain.gain.setValueAtTime(this.volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Audio catch
    }
  }

  // 17. Ultra-soft whisper tick for card hover
  public playHover() {
    haptics.hover();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, now);
      gain.gain.setValueAtTime(this.volume * 0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.012);
    } catch {
      // Audio catch
    }
  }

  // 18. Crystal shimmer chime for discount badges and seasonal offers
  public playBadge() {
    haptics.badge();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [1046.5, 1318.5]; // C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.035;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(this.volume * 0.4, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.07);
      });
    } catch {
      // Audio catch
    }
  }

  // 19. Ascending two-note chime for quotation calculations
  public playQuote() {
    haptics.quote();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [440, 659.25]; // A4, E5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.04;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(this.volume * 0.6, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.09);
      });
    } catch {
      // Audio catch
    }
  }

  // 20. Gentle bell chime for floating contact widget and notifications
  public playNotification() {
    haptics.notification();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now); // C6

      gain.gain.setValueAtTime(this.volume * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio catch
    }
  }
}

export const sound = new SoundSystem();
export { haptics } from './haptics';
