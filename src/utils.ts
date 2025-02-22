/**
 * Generates the default chart options for a chart.
 *
 * @param {Object} params - The parameters for the chart options.
 * @param {string} params.title - The title of the chart.
 * @param {string} params.yTitle - The title for the y-axis.
 * @param {string} params.xTitle - The title for the x-axis.
 * @returns {Object} The default chart options.
 */
export function getDefaultChartOptions ({ title, yTitle, xTitle }: { title: string, yTitle: string, xTitle: string }): { responsive: boolean; maintainAspectRatio: boolean; plugins: { legend: { position: string; labels: { usePointStyle: boolean; }; }; title: { display: boolean; text: string; }; }; scales: { y: { beginAtZero: boolean; title: { display: boolean; text: string; }; }; x: { title: { display: boolean; text: string; }; }; }; } {
  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true
        }
      },
      title: {
        display: true,
        text: title,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yTitle
        }
      },
      x: {
        title: {
          display: true,
          text: xTitle
        }
      }
    }
  }
}
