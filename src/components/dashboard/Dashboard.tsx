import { useDashboard } from '@/hooks'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { AuditoryDiscriminationChart, Feedback, PronunciationChart, RankingChart, Today } from './charts'

const ResponsiveGridLayout = WidthProvider(Responsive)

const Dashboard = () => {
  const { pronunciationChart, auditoryChart, rankingChart } = useDashboard()

  const layouts = {
    lg: [
      { i: 'today', x: 0, y: 0, w: 6, h: 2, static: true },
      { i: 'feedback', x: 6, y: 0, w: 6, h: 2, static: true },
      { i: 'auditoryChart', x: 0, y: 1, w: 6, h: 3 },
      ...pronunciationChart.map((_, index) => ({
        i: `pronunciationChart-${index}`,
        x: index % 2 === 0 ? 0 : 6,
        y: Math.floor(index / 2) + 2,
        w: 6,
        h: 3
      })),
      ...rankingChart.map((_, index) => ({
        i: `rankingChart-${index}`,
        x: index % 2 === 0 ? 0 : 6,
        y: Math.floor((index + pronunciationChart.length) / 2) + 2 + Math.floor(pronunciationChart.length / 2),
        w: 6,
        h: 3
      }))
    ]
  }

  return (
    <div className="w-full p-4">
      <div>
        <h1>Progreso del Paciente</h1>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={170}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        <div key="today">
          <Today />
        </div>
        <div key="feedback">
          <Feedback />
        </div>
        <div key="auditoryChart">
          <AuditoryDiscriminationChart chartData={auditoryChart} />
        </div>
        {pronunciationChart.map((data, index) => (
          <div key={`pronunciationChart-${index}`}>
            <PronunciationChart chartData={data} />
          </div>
        ))}
        {rankingChart.map((data, index) => (
          <div key={`rankingChart-${index}`}>
            <RankingChart chartData={data} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default Dashboard
