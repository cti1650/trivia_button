import type { DOMAttributes, VFC } from "react";
import { useState } from 'react';
import cc from 'classcat';

type CommonType = {
  size?: 'small' | 'large' | 'big';
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
    audioData,
    onImageData,
    offImageData,
    className,
  } = props;
  const classes = cc([
    {
      'w-16 h-16': size === 'small',
      'w-48 h-48': size === 'large',
      'w-60 h-60': size === 'big',
    },
    className,
  ])
  const [image, setImage] = useState(offImageData);
  const [buttonTimeOut, setButtonTimeOut] = useState(null);
  const handleTriviaClick = (event: React.MouseEvent<HTMLInputElement>) => {
    setImage(onImageData);
    const audio = new Audio(audioData); //　コンストラクタでaudio要素を生成
    audio.volume = 0.2;
    audio.play().then(() => {
      onClick(event);
      setButtonTimeOut(
        setTimeout(() => {
          setImage(offImageData);
        }, 600)
      );
    }); // 再生
  };
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
  audioData: 'get.mp3',
  onImageData: 'img/on.png',
  offImageData: 'img/off.png',
};