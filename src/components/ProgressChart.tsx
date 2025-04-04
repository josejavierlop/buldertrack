import { useClimbing } from '../context/ClimbingContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox, Chip, Stack, Divider } from '@mui/material';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const ProgressChart = () => {
  const { blocks } = useClimbing();
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>({ total: true });
  const { t } = useTranslation();

  // Get all unique difficulty levels
  const difficultyLevels = useMemo(() => {
    const levels = new Set(blocks.map(block => block.difficulty));
    return Array.from(levels).sort((a, b) => a - b);
  }, [blocks]);

  // Calculate totals by level
  const totalsByLevel = useMemo(() => {
    return blocks
      .filter(block => block.status === 'achieved')
      .reduce((acc, block) => {
        acc[block.difficulty] = (acc[block.difficulty] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
  }, [blocks]);

  // Initialize visible series for all difficulty levels
  useMemo(() => {
    difficultyLevels.forEach(level => {
      if (visibleSeries[`level${level}`] === undefined) {
        setVisibleSeries(prev => ({ ...prev, [`level${level}`]: true }));
      }
    });
  }, [difficultyLevels]);

  // Prepare cumulative data
  const chartData = useMemo(() => {
    const achievedBlocks = blocks
      .filter(block => block.status === 'achieved')
      .sort((a, b) => a.achievedDate!.getTime() - b.achievedDate!.getTime());

    const data: any[] = [];
    const runningTotals: Record<number, number> = {};
    let totalCount = 0;

    achievedBlocks.forEach(block => {
      const date = format(block.achievedDate!, 'yyyy-MM-dd');
      runningTotals[block.difficulty] = (runningTotals[block.difficulty] || 0) + 1;
      totalCount += 1;

      const existingEntry = data.find(entry => entry.date === date);
      if (existingEntry) {
        existingEntry[`level${block.difficulty}`] = runningTotals[block.difficulty];
        existingEntry.total = totalCount;
      } else {
        const newEntry: any = { date };
        difficultyLevels.forEach(level => {
          newEntry[`level${level}`] = runningTotals[level] || 0;
        });
        newEntry.total = totalCount;
        data.push(newEntry);
      }
    });

    return data;
  }, [blocks, difficultyLevels]);

  const colors = [
    '#2196f3',
    '#f50057',
    '#4caf50',
    '#ff9800',
    '#9c27b0',
    '#795548',
    '#607d8b',
    '#e91e63',
    '#3f51b5',
  ];

  const totalCompleted = Object.values(totalsByLevel).reduce((sum, count) => sum + count, 0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('progress.overview')}
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            {t('progress.totalCompleted')}: {totalCompleted}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ 
              flexWrap: 'wrap', 
              gap: 1,
              '& > *': { mb: 1 }
            }}
          >
            {difficultyLevels.map((level, index) => (
              <Chip
                key={level}
                label={`${t('progress.level')} ${level}: ${totalsByLevel[level] || 0}`}
                sx={{
                  bgcolor: `${colors[index % colors.length]}15`,
                  color: colors[index % colors.length],
                  fontWeight: 'medium',
                }}
              />
            ))}
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />
        <FormGroup row sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={visibleSeries.total}
                onChange={(e) => setVisibleSeries(prev => ({ ...prev, total: e.target.checked }))}
              />
            }
            label={t('progress.total')}
          />
          {difficultyLevels.map((level, index) => (
            <FormControlLabel
              key={level}
              control={
                <Checkbox
                  checked={visibleSeries[`level${level}`]}
                  onChange={(e) => 
                    setVisibleSeries(prev => ({ 
                      ...prev, 
                      [`level${level}`]: e.target.checked 
                    }))
                  }
                />
              }
              label={`${t('progress.level')} ${level}`}
            />
          ))}
        </FormGroup>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {visibleSeries.total && (
                <Line
                  type="monotone"
                  dataKey="total"
                  name={t('progress.total')}
                  stroke="#000000"
                  strokeWidth={2}
                  dot={false}
                />
              )}
              {difficultyLevels.map((level, index) => 
                visibleSeries[`level${level}`] && (
                  <Line
                    key={level}
                    type="monotone"
                    dataKey={`level${level}`}
                    name={`${t('progress.level')} ${level}`}
                    stroke={colors[index % colors.length]}
                    dot={false}
                  />
                )
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProgressChart; 