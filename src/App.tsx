import { useState } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { ClimbingProvider } from './context/ClimbingContext'
import BlockList from './components/BlockList'
import ProgressChart from './components/ProgressChart'
import { Box, Container, Typography, Tabs, Tab, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

function App() {
  const [activeTab, setActiveTab] = useState(0)
  const { t } = useTranslation()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClimbingProvider>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 2,
              mb: 4
            }}>
              <img 
                src="/rock-progress-logo.svg" 
                alt="RockProgress Logo" 
                style={{ width: '60px', height: '60px' }} 
              />
              <Typography variant="h3" component="h1" gutterBottom>
                {t('app.title')}
              </Typography>
            </Box>
            
            <Paper sx={{ mb: 4 }}>
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                centered
              >
                <Tab label={t('navigation.myBlocks')} />
                <Tab label={t('navigation.progress')} />
              </Tabs>
            </Paper>

            {activeTab === 0 && <BlockList />}
            {activeTab === 1 && <ProgressChart />}
          </Box>
        </Container>
      </ClimbingProvider>
    </ThemeProvider>
  )
}

export default App
