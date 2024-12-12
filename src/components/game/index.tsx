import React, { useState } from 'react';
import Game from '../GameCard';

export default function GamePage({ game }: any) {
  return <Game game={game} />;
}
