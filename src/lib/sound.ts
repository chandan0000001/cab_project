/**
 * Pure Web Audio API Sound System
 * Inspired by Kobra Design System (https://kobra.systems/components/sound)
 * Synthesizes crisp, tactile micro-UI audio cues with zero external audio assets.
 * Guaranteed to trigger on every user click across desktop and mobile.
 */

class SoundSystem {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.28; // Crisp, clearly audible tactile level
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    this.isMuted = false;
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('st_sound_muted');
      } catch {
        // Ignore
      }
      this.attachGlobalInteractions();
    }
  }

  private attachGlobalInteractions() {
    if (typeof window === 'undefined') return;

    // Unlock / resume AudioContext on first user interaction anywhere
    const unlock = () => {
      this.resume();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true, capture: true });
    window.addEventListener('touchstart', unlock, { passive: true, capture: true });
    window.addEventListener('keydown', unlock, { passive: true, capture: true });

    // Global click listener: Plays sound on EVERY button, link, or clickable element
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], [data-clickable]'
      );

      if (clickable) {
        this.playTap();
      }
    };

    window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
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

  /**
   * Tactile micro-click (synthesized button tap)
   * Plays a crisp, satisfying, tactile click tone.
   */
  public playTap() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // Layer 1: High crisp snap
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1400, now);
      osc1.frequency.exponentialRampToValueAtTime(450, now + 0.024);

      gain1.gain.setValueAtTime(this.volume, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.028);

      // Layer 2: Warm body thud
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(380, now);
      osc2.frequency.exponentialRampToValueAtTime(120, now + 0.035);

      gain2.gain.setValueAtTime(this.volume * 0.8, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now);
      osc2.stop(now + 0.04);
    } catch {
      // Audio catch
    }
  }

  /**
   * Pop tone for opening modal, dropdown, or drawer
   */
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.06);

      gain.gain.setValueAtTime(this.volume * 0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {
      // Audio catch
    }
  }

  /**
   * Soft closing tone
   */
  public playClose() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.045);

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

  /**
   * Harmonic chime for success
   */
  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(this.volume * 0.8, noteStart + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.3);
      });
    } catch {
      // Audio catch
    }
  }

  /**
   * Sub-audible soft hover tick
   */
  public playHover() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, now);
      gain.gain.setValueAtTime(this.volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.014);
    } catch {
      // Audio catch
    }
  }
}

export const sound = new SoundSystem();
