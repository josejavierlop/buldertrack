export type BlockCategory = 'Balance' | 'Strength' | 'Technique' | 'Dyno';
export type HoldType = 'Sloper' | 'Crimp' | 'Jug' | 'Pinch';

export interface ClimbingBlock {
  id: string;
  name: string;
  difficulty: number;
  photo?: string;
  startDate: Date;
  achievedDate?: Date;
  abandonedDate?: Date;
  categories: BlockCategory[];
  holdTypes: HoldType[];
  status: 'inProgress' | 'achieved' | 'abandoned';
}

export interface BlockStats {
  totalBlocks: number;
  blocksByDifficulty: Record<number, number>;
  blocksByCategory: Record<BlockCategory, number>;
  blocksByHoldType: Record<HoldType, number>;
} 