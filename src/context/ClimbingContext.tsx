import React, { createContext, useContext, useState } from 'react';
import { ClimbingBlock } from '../types';
import { mockBlocks } from '../mockData';

interface ClimbingContextType {
  blocks: ClimbingBlock[];
  addBlock: (block: Omit<ClimbingBlock, 'id'>) => void;
  promoteBlock: (id: string) => void;
  archiveBlock: (id: string) => void;
}

const ClimbingContext = createContext<ClimbingContextType | undefined>(undefined);

export const ClimbingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blocks, setBlocks] = useState<ClimbingBlock[]>(mockBlocks);

  const addBlock = (block: Omit<ClimbingBlock, 'id'>) => {
    const newBlock: ClimbingBlock = {
      ...block,
      id: Date.now().toString(),
    };
    setBlocks([...blocks, newBlock]);
  };

  const promoteBlock = (id: string) => {
    setBlocks(blocks.map(block => 
      block.id === id 
        ? { ...block, status: 'achieved', achievedDate: new Date() }
        : block
    ));
  };

  const archiveBlock = (id: string) => {
    setBlocks(blocks.map(block => 
      block.id === id 
        ? { ...block, status: 'abandoned', abandonedDate: new Date() }
        : block
    ));
  };

  return (
    <ClimbingContext.Provider value={{ blocks, addBlock, promoteBlock, archiveBlock }}>
      {children}
    </ClimbingContext.Provider>
  );
};

export const useClimbing = () => {
  const context = useContext(ClimbingContext);
  if (context === undefined) {
    throw new Error('useClimbing must be used within a ClimbingProvider');
  }
  return context;
}; 