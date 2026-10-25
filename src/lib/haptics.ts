// Premium mobile haptic feedback engine using Web Vibration API
// Features crisp micro-pulse timings for tactile feedback on mobile devices

export type HapticType =
  | 'tap'
  | 'pop'
  | 'close'
  | 'success'
  | 'switch'
  | 'carSelect'
  | 'routeSelect'
  | 'tab'
  | 'whatsapp'
  | 'call'
  | 'copy'
  | 'filter'
  | 'accordion'
  | 'inputFocus'
  | 'error'
  | 'clear'
  | 'hover'
  | 'badge'
  | 'quote'
  | 'notification'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy';

// Tactile millisecond patterns tuned for responsive, premium haptic feedback
const HAPTIC_PATTERNS: Record<HapticType, number | number[]> = {
  tap: 10,
  pop: 14,
  close: 8,
  success: [12, 35, 18],
  switch: 10,
  carSelect: 15,
  routeSelect: 12,
  tab: 9,
  whatsapp: [14, 40, 16],
  call: [18, 50, 18],
  copy: [12, 30, 14],
  filter: 10,
  accordion: 12,
  inputFocus: 6,
  error: [18, 50, 18, 50, 22],
  clear: [8, 25, 8],
  hover: 5,
  badge: 10,
  quote: [16, 45, 20],
  notification: [15, 35, 15],
  impactLight: 8,
  impactMedium: 16,
  impactHeavy: 24,
};

class HapticSystem {
  private lastTriggerTime = 0;
  private readonly THROTTLE_MS = 20;

  // Check if Web Vibration API is supported and accessible
  public isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'navigator' in window &&
      typeof navigator.vibrate === 'function'
    );
  }

  // Trigger a specific haptic pulse pattern
  public trigger(type: HapticType = 'tap', force = false): boolean {
    if (!this.isSupported()) return false;

    const now = Date.now();
    if (!force && now - this.lastTriggerTime < this.THROTTLE_MS) {
      return false;
    }
    this.lastTriggerTime = now;

    try {
      const pattern = HAPTIC_PATTERNS[type] ?? 10;
      return navigator.vibrate(pattern);
    } catch {
      return false;
    }
  }

  // Convenience methods matching tactile interaction profiles
  public tap = (force = false) => this.trigger('tap', force);
  public pop = (force = false) => this.trigger('pop', force);
  public close = (force = false) => this.trigger('close', force);
  public success = (force = true) => this.trigger('success', force);
  public switch = (force = false) => this.trigger('switch', force);
  public carSelect = (force = true) => this.trigger('carSelect', force);
  public routeSelect = (force = true) => this.trigger('routeSelect', force);
  public tab = (force = false) => this.trigger('tab', force);
  public whatsapp = (force = true) => this.trigger('whatsapp', force);
  public call = (force = true) => this.trigger('call', force);
  public copy = (force = true) => this.trigger('copy', force);
  public filter = (force = false) => this.trigger('filter', force);
  public accordion = (force = false) => this.trigger('accordion', force);
  public inputFocus = (force = false) => this.trigger('inputFocus', force);
  public error = (force = true) => this.trigger('error', force);
  public clear = (force = false) => this.trigger('clear', force);
  public hover = (force = false) => this.trigger('hover', force);
  public badge = (force = false) => this.trigger('badge', force);
  public quote = (force = true) => this.trigger('quote', force);
  public notification = (force = true) => this.trigger('notification', force);
  public impactLight = (force = false) => this.trigger('impactLight', force);
  public impactMedium = (force = false) => this.trigger('impactMedium', force);
  public impactHeavy = (force = true) => this.trigger('impactHeavy', force);
}

export const haptics = new HapticSystem();
