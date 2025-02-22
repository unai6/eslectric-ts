export function getDefaultChartOptions(
  { title, yTitle, xTitle, responsive, maintainAspectRatio }: { title: string, yTitle: string, xTitle: string, responsive: boolean, maintainAspectRatio: boolean },
) {
  return {
    responsive,
    maintainAspectRatio,
    plugins: {
      legend: {
        position: window.innerWidth < 768 ? 'bottom' : 'top',
        labels: {
          usePointStyle: true,
          boxWidth: window.innerWidth < 768 ? 8 : 12,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: window.innerWidth < 768 ? 14 : 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: window.innerWidth >= 768,
          text: yTitle
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      x: {
        title: {
          display: window.innerWidth >= 768,
          text: xTitle
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          },
          maxRotation: window.innerWidth < 768 ? 45 : 0
        }
      }
    }
  }
}
