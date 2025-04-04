import { useClimbing } from '../context/ClimbingContext';
import { format } from 'date-fns';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Divider,
  Fab,
  Dialog,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { CheckCircle, Add, Close } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddBlockForm from './AddBlockForm';

const BlockList = () => {
  const { blocks, promoteBlock, archiveBlock } = useClimbing();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const { t } = useTranslation();

  const inProgressBlocks = blocks.filter(block => 
    block.status === 'inProgress' || (showArchived && block.status === 'abandoned')
  );
  const achievedBlocks = blocks.filter(block => block.status === 'achieved');

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const renderBlockCard = (block: typeof blocks[0]) => (
    <Box 
      key={block.id}
      sx={{ 
        width: { xs: '100%', sm: '50%', md: '33.33%' },
        padding: 1.5,
        display: 'inline-block'
      }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="div">
              {block.name}
            </Typography>
            <Chip
              label={`${t('blocks.grade')} ${block.difficulty}`}
              color="primary"
              size="small"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            {block.categories.map(category => (
              <Chip
                key={category}
                label={t(`blocks.category.${category.toLowerCase()}`)}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Box sx={{ mb: 2 }}>
            {block.holdTypes.map(holdType => (
              <Chip
                key={holdType}
                label={t(`blocks.holdType.${holdType.toLowerCase()}`)}
                size="small"
                sx={{ mr: 1, mb: 1 }}
                color="secondary"
              />
            ))}
          </Box>

          <Typography variant="body2" color="text.secondary">
            {t('blocks.dateStarted')}: {format(block.startDate, 'MMM d, yyyy')}
          </Typography>
          
          {block.achievedDate && (
            <Typography variant="body2" color="text.secondary">
              {t('blocks.dateCompleted')}: {format(block.achievedDate, 'MMM d, yyyy')}
            </Typography>
          )}

          {block.abandonedDate && (
            <Typography variant="body2" color="text.secondary">
              {t('blocks.dateAbandoned')}: {format(block.abandonedDate, 'MMM d, yyyy')}
            </Typography>
          )}

          {block.status === 'inProgress' && (
            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: '1 1 auto', minWidth: '140px' }}
                onClick={() => promoteBlock(block.id)}
                startIcon={<CheckCircle />}
              >
                {t('blocks.completed')}
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ flex: '1 1 auto', minWidth: '100px' }}
                onClick={() => archiveBlock(block.id)}
                startIcon={<Close />}
              >
                {t('blocks.giveUp')}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', minHeight: '60vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          {t('blocks.inProgress')}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
            />
          }
          label={t('blocks.showAbandoned')}
        />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5, mb: 4 }}>
        {inProgressBlocks.map(renderBlockCard)}
      </Box>

      <Typography variant="h5" gutterBottom>
        {t('blocks.achieved')}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
        {achievedBlocks.map(renderBlockCard)}
      </Box>

      <Fab
        color="primary"
        aria-label={t('blocks.addBlock')}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
        }}
        onClick={handleOpenAddDialog}
      >
        <Add />
      </Fab>

      <Dialog
        open={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        maxWidth="sm"
        fullWidth
      >
        <AddBlockForm onClose={handleCloseAddDialog} />
      </Dialog>
    </Box>
  );
};

export default BlockList; 