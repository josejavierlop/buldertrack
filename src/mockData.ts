import { ClimbingBlock } from './types';

export const mockBlocks: ClimbingBlock[] = [
  {
    id: '1',
    name: 'Crimpy Overhang',
    difficulty: 5,
    startDate: new Date('2024-03-01'),
    achievedDate: new Date('2024-03-15'),
    categories: ['Strength', 'Technique'],
    holdTypes: ['Crimp', 'Pinch'],
    status: 'achieved'
  },
  {
    id: '2',
    name: 'Slab Master',
    difficulty: 4,
    startDate: new Date('2024-03-10'),
    achievedDate: new Date('2024-03-20'),
    categories: ['Balance', 'Technique'],
    holdTypes: ['Sloper'],
    status: 'achieved'
  },
  {
    id: '3',
    name: 'Power Move',
    difficulty: 7,
    startDate: new Date('2024-03-25'),
    categories: ['Strength'],
    holdTypes: ['Jug', 'Crimp'],
    status: 'inProgress'
  },
  {
    id: '4',
    name: 'Balance Beam',
    difficulty: 3,
    startDate: new Date('2024-03-28'),
    categories: ['Balance'],
    holdTypes: ['Sloper', 'Pinch'],
    status: 'inProgress'
  },
  {
    id: '5',
    name: 'Technical Edge',
    difficulty: 6,
    startDate: new Date('2024-03-15'),
    achievedDate: new Date('2024-03-30'),
    categories: ['Technique'],
    holdTypes: ['Crimp', 'Jug'],
    status: 'achieved'
  }
]; 