import { FC } from 'react';

interface Move {
  from: { row: number; col: number };
  to: { row: number; col: number };
  piece: {
    type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
    color: 'white' | 'black';
  };
}

interface MoveHistoryProps {
  moves: Move[];
  currentMove: number;
  onMoveSelect: (index: number) => void;
}

export const MoveHistory: FC<MoveHistoryProps> = ({
  moves,
  currentMove,
  onMoveSelect,
}) => {
  const getSquareName = (row: number, col: number) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return `${files[col]}${ranks[row]}`;
  };

  return (
    <div className='w-full sm:w-64 bg-gray-800 shadow-md rounded-lg p-4 text-gray-200'>
      <h2 className='text-lg font-bold mb-4'>Move History</h2>
      <div className='flex gap-2 mb-4 flex-wrap'>
        <button
          className='px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 text-gray-200'
          onClick={() => onMoveSelect(-1)}
          disabled={currentMove === -1}
        >
          {'<<'}
        </button>
        <button
          className='px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 text-gray-200'
          onClick={() => onMoveSelect(currentMove - 1)}
          disabled={currentMove <= -1}
        >
          {'<'}
        </button>
        <button
          className='px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 text-gray-200'
          onClick={() => onMoveSelect(currentMove + 1)}
          disabled={currentMove >= moves.length - 1}
        >
          {'>'}
        </button>
        <button
          className='px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 text-gray-200'
          onClick={() => onMoveSelect(moves.length - 1)}
          disabled={currentMove === moves.length - 1 || moves.length === 0}
        >
          {'>>'}
        </button>
      </div>
      <div className='max-h-64 overflow-y-auto'>
        {moves.map((move, index) => (
          <div
            key={index}
            className={`p-2 cursor-pointer hover:bg-gray-700 ${
              index === currentMove ? 'bg-blue-900' : ''
            }`}
            onClick={() => onMoveSelect(index)}
          >
            {index + 1}. {move.piece.color === 'white' ? 'White' : 'Black'}{' '}
            {move.piece.type} {getSquareName(move.from.row, move.from.col)} →{' '}
            {getSquareName(move.to.row, move.to.col)}
          </div>
        ))}
      </div>
    </div>
  );
};