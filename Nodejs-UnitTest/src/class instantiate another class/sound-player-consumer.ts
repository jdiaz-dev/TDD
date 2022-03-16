import { SoundPlayer } from "./sound-player";

export class SoundPlayerConsumer {
  soundPlayer!: SoundPlayer
  constructor() {
    this.soundPlayer = new SoundPlayer();
  }

  playSomethingCool() {
    const coolSoundFileName = 'song.mp3';
    this.soundPlayer.playSoundFile(coolSoundFileName);
  }
}