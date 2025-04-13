'use client';

import { Typewriter } from 'react-simple-typewriter';

type TypingTextProps = {
  words: string[];
  loop?: number | boolean;
  cursorStyle?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
  className?: string;
};

export default function TypingText({
  words,
  loop = 1,
  cursorStyle = '|',
  typeSpeed = 70,
  deleteSpeed = 50,
  delaySpeed = 1500,
  className = '',
}: TypingTextProps) {
  return (
    <span className={className}>
      <Typewriter
        words={words}
        loop={loop}
        cursor
        cursorStyle={cursorStyle}
        typeSpeed={typeSpeed}
        deleteSpeed={deleteSpeed}
        delaySpeed={delaySpeed}
      />
    </span>
  );
}
