export const mainBoxStyle = {
  backgroundColor: '#e0e0e0',
  height: '96vh',
  paddingTop: '2vh',
  paddingBottom: '2vh',
  paddingLeft: '2vw',
  paddingRight: '2vw',
} as const;

export const headerStyle = {
  height: '4%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingBottom: '1%'
} as const;

export const chatHubWrapperStyle = { backgroundColor: '#FFF', height: '95%' } as const;

export const chatHubStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  height: '100%'
} as const;

export const clientsFeedStyle = {
  width: '20%', 
  borderRight: '1px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
} as const;

export const chatStyle = {
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
} as const;