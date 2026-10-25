// Premium mobile haptic feedback engine using Web Vibration API
// Features calibrated millisecond pulse timings for physical tactile vibration on mobile hardware

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

interface NavigatorWithVibrate extends Navigator {
  webkitVibrate?: (pattern: number | number[]) => boolean;
  mozVibrate?: (pattern: number | number[]) => boolean;
  msVibrate?: (pattern: number | number[]) => boolean;
}

// Tactile millisecond patterns tuned to overcome motor inertia on mobile smartphones (30ms - 75ms)
const HAPTIC_PATTERNS: Record<HapticType, number | number[]> = {
  tap: 35,
  pop: 45,
  close: 30,
  success: [45, 50, 50],
  switch: 30,
  carSelect: 50,
  routeSelect: 45,
  tab: 30,
  whatsapp: [45, 50, 45],
  call: [55, 65, 55],
  copy: [40, 50, 40],
  filter: 35,
  accordion: 40,
  inputFocus: 25,
  error: [65, 80, 65, 80, 70],
  clear: [35, 45, 35],
  hover: 20,
  badge: 40,
  quote: [45, 50, 50],
  notification: [50, 60, 50],
  impactLight: 35,
  impactMedium: 50,
  impactHeavy: 75,
};

class HapticSystem {
  private lastTriggerTime = 0;
  private readonly THROTTLE_MS = 40;

  // Check if Web Vibration API is supported (including webkit/moz vendor prefixes)
  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const nav = window.navigator as NavigatorWithVibrate;
    return !!(
      nav &&
      (typeof nav.vibrate === 'function' ||
        typeof nav.webkitVibrate === 'function' ||
        typeof nav.mozVibrate === 'function' ||
        typeof nav.msVibrate === 'function')
    );
  }

  // Trigger a specific haptic pulse pattern
  public trigger(type: HapticType = 'tap', force = false): boolean {
    const pattern = HAPTIC_PATTERNS[type] ?? 35;

    // Log in browser console with visual badge for clear verification during testing
    if (typeof window !== 'undefined') {
      try {
        console.log(
          `%c📳 [HAPTIC VIBRATION]%c ${type} (${Array.isArray(pattern) ? pattern.join(', ') : pattern}ms)`,
          'background: #2563eb; color: #ffffff; font-weight: bold; border-radius: 4px; padding: 2px 6px; font-size: 11px;',
          'color: #0f172a; font-weight: 600; font-size: 11px;'
        );
      } catch {
        // Suppress console error if logging is restricted
      }
    }

    if (!this.isSupported()) return false;

    const now = Date.now();
    if (!force && now - this.lastTriggerTime < this.THROTTLE_MS) {
      return false;
    }
    this.lastTriggerTime = now;

    try {
      const nav = window.navigator as NavigatorWithVibrate;
      const vibrateFn = (nav.vibrate ||
        nav.webkitVibrate ||
        nav.mozVibrate ||
        nav.msVibrate) as ((p: number | number[]) => boolean) | undefined;
      if (typeof vibrateFn === 'function') {
        return vibrateFn.call(nav, pattern);
      }
      return false;
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

// Expose on window for easy developer verification in console
if (typeof window !== 'undefined') {
  const win = window as unknown as Record<string, unknown>;
  win.__haptics = haptics;
  win.__testVibrate = (_ms = 60) => haptics.trigger('impactHeavy', true);
}
