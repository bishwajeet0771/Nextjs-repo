interface PlotData {
  standardPlot: string;
  length: number;
  width: number;
  // Add any other properties of the plot data object
}

function countPlots(plotData: PlotData[]): {
  standardPlotCount: number;
  oddPlotCount: number;
  standardPlots: string[];
  oddPlots: string[];
} {
  const result = {
    standardPlotCount: 0,
    oddPlotCount: 0,
    standardPlots: [] as string[],
    oddPlots: [] as string[],
  };

  for (const plot of plotData) {
    if (plot.standardPlot == "Y") {
      result.standardPlotCount++;
      result.standardPlots.push(`${plot.length}_${plot.width}`);
    } else {
      result.oddPlotCount++;
      result.oddPlots.push(`${plot.length}_${plot.width}`);
    }
  }

  return result;
}

export { countPlots };
