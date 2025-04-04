import { useState } from 'react';
import { useClimbing } from '../context/ClimbingContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { BlockCategory, HoldType } from '../types';
import { useTranslation } from 'react-i18next';

interface AddBlockFormProps {
  onClose: () => void;
}

const AddBlockForm = ({ onClose }: AddBlockFormProps) => {
  const { addBlock } = useClimbing();
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<number>(1);
  const [categories, setCategories] = useState<BlockCategory[]>([]);
  const [holdTypes, setHoldTypes] = useState<HoldType[]>([]);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBlock({
      name,
      difficulty,
      categories,
      holdTypes,
      startDate: new Date(),
      status: 'inProgress',
    });
    setName('');
    setDifficulty(1);
    setCategories([]);
    setHoldTypes([]);
    onClose();
  };

  const handleCategoryChange = (category: BlockCategory) => {
    setCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleHoldTypeChange = (holdType: HoldType) => {
    setHoldTypes(prev =>
      prev.includes(holdType)
        ? prev.filter(h => h !== holdType)
        : [...prev, holdType]
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <DialogTitle>{t('blocks.addNewBlock')}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <TextField
            fullWidth
            label={t('blocks.blockName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />

          <FormControl fullWidth>
            <InputLabel>{t('blocks.difficultyLevel')}</InputLabel>
            <Select
              value={difficulty}
              label={t('blocks.difficultyLevel')}
              onChange={(e) => setDifficulty(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
                <MenuItem key={level} value={level}>
                  {t('blocks.grade')} {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {t('blocks.categories')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {(['Balance', 'Strength', 'Technique', 'Dyno'] as BlockCategory[]).map((category) => (
                <Chip
                  key={category}
                  label={t(`blocks.category.${category.toLowerCase()}`)}
                  onClick={() => handleCategoryChange(category)}
                  color={categories.includes(category) ? 'primary' : 'default'}
                  variant={categories.includes(category) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {t('blocks.holdTypes')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {(['Sloper', 'Crimp', 'Jug', 'Pinch'] as HoldType[]).map((holdType) => (
                <Chip
                  key={holdType}
                  label={t(`blocks.holdType.${holdType.toLowerCase()}`)}
                  onClick={() => handleHoldTypeChange(holdType)}
                  color={holdTypes.includes(holdType) ? 'primary' : 'default'}
                  variant={holdTypes.includes(holdType) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!name || categories.length === 0}
        >
          {t('blocks.addBlock')}
        </Button>
      </DialogActions>
    </Box>
  );
};

export default AddBlockForm; 