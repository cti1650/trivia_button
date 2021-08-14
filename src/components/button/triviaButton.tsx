import { DOMAttributes, useCallback, VFC } from "react";
import { useState } from 'react';
import cc from 'classcat';

type CommonType = {
  size?: 'small' | 'large' | 'big';
  volume?: 'mute' | 'min' | 'low' | 'middle' | 'high' | 'max';
  audioData?: string;
  onImageData?: string;
  offImageData?: string;
  className?: string;
};

type ButtonType = CommonType & {
  button: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
};

export const TriviaButton: VFC<ButtonType> = (props) => {
  const {
    onClick = () => { },
    size,
    volume,
    audioData,
    onImageData,
    offImageData,
    className,
  } = props;
  const classes = cc([
    {
      'w-16 h-auto': size === 'small',
      'w-48 h-auto': size === 'large',
      'w-60 h-auto': size === 'big',
    },
    className,
  ])
  const [image, setImage] = useState(offImageData);
  const [buttonTimeOut, setButtonTimeOut] = useState(null);
  const handleTriviaClick = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
    setImage(onImageData);
    const audio = new Audio(audioData);
    switch (volume) {
      case 'max':
        audio.muted = false;
        audio.volume = 1;
        break;
      case 'high':
        audio.muted = false;
        audio.volume = 0.75;
        break;
      case 'middle':
        audio.muted = false;
        audio.volume = 0.5;
        break;
      case 'low':
        audio.muted = false;
        audio.volume = 0.25;
        break;
      case 'min':
        audio.muted = false;
        audio.volume = 0.1;
        break;
      case 'mute':
        audio.muted = true;
        audio.volume = 0;
        break;
      default:
        audio.muted = false;
        audio.volume = 0.1;
    }

    audio.play().then(() => {
      onClick(event);
      setButtonTimeOut(
        setTimeout(() => {
          setImage(offImageData);
        }, 600)
      );
    });
  }, [image, volume, audioData, onImageData, offImageData]);
  return (
    <>
      <div>
        <button className='focus:outline-none' onClick={handleTriviaClick}>
          <img
            src={image}
            alt='img'
            className={classes}
          />
        </button>
      </div>
    </>
  );
};

TriviaButton.defaultProps = {
  size: 'small',
  volume: 'min',
  audioData: 'get.mp3',
  onImageData: 'img/on.png',
  offImageData: 'img/off.png',
};