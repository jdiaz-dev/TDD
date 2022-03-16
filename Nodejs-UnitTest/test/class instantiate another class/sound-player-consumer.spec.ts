import { SoundPlayerConsumer } from 'src/class instantiate another class/sound-player-consumer';
import { SoundPlayer } from 'src/class instantiate another class/sound-player';
import { mocked } from 'ts-jest/utils';

let mockPlaySoundFile = jest.fn();
jest.mock('src/class instantiate another class/sound-player', () => {
  return {
    SoundPlayer: jest.fn().mockImplementation(() => {
      return {
        playSoundFile: mockPlaySoundFile,
      };
    }),
  };
});

describe('SoundPlayerConsumer', () => {
  const MockedSoundPlayer = mocked(SoundPlayer, true);

  /* beforeEach(() => {
   // Clears the record of calls to the mock constructor function and its methods
   MockedSoundPlayer.mockClear();

  }); */

  it('We can check if the consumer called the class constructor', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    soundPlayerConsumer;
    expect(MockedSoundPlayer).toHaveBeenCalledTimes(1);
  });

  it('We can check if the consumer called the class constructor', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    soundPlayerConsumer
    expect(SoundPlayer).toHaveBeenCalled();
  });

  it('We can check if the consumer called a method on the class instance', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    const coolSoundFileName = 'song.m';
    soundPlayerConsumer.playSomethingCool();

    /* const spy1 = jest
      .spyOn(classMocked, 'playSoundFile')
      .mockImplementation((): any => null); */

    // expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
    expect(mockPlaySoundFile.mock.calls).toEqual(coolSoundFileName);
  });
});
