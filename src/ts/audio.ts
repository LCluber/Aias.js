
export function getAudioContext(): { new (contextOptions?: AudioContextOptions | undefined): AudioContext; prototype: AudioContext; } | false {
  if (typeof window === 'undefined') {
    return false;
  } else {
    return window.AudioContext || // Default
          (<any>window).webkitAudioContext || // Safari and old versions of Chrome
          false
  }
}
