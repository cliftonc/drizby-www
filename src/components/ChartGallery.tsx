import { useState, useCallback } from "react";
import { LazyChart } from "drizzle-cube/client/charts";
import { CubeProvider } from "drizzle-cube/client/providers";
import { AnalysisDisplayConfigPanel } from "drizzle-cube/client/components";

import { getChartTypeIcon } from "drizzle-cube/client/icons";
import { chartDemoRegistry } from "../data/chartDemoRegistry";
import "drizzle-cube/client/styles.css";
import "./ChartGallery.css";
import type { ChartDemoConfig } from "../data/chartDemoRegistry";

const defaultColorPalette = {
  name: "demo",
  label: "Demo Palette",
  colors: [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#0088fe",
    "#00c49f",
    "#ffbb28",
    "#ff8042",
  ],
};

const chartTypes: { key: string; label: string; description: string }[] = [
  { key: "bar", label: "Bar", description: "Compare values across categories" },
  { key: "line", label: "Line", description: "Trends over time" },
  { key: "area", label: "Area", description: "Magnitude of change" },
  { key: "pie", label: "Pie", description: "Proportions of a whole" },
  { key: "scatter", label: "Scatter", description: "Correlations between variables" },
  { key: "radar", label: "Radar", description: "Multi-metric comparison" },
  { key: "radialBar", label: "Radial Bar", description: "Circular progress" },
  { key: "treemap", label: "Tree Map", description: "Hierarchical data" },
  { key: "bubble", label: "Bubble", description: "Three dimensions" },
  { key: "activityGrid", label: "Activity Grid", description: "Temporal patterns" },
  { key: "kpiNumber", label: "KPI Number", description: "Headline metrics" },
  { key: "kpiDelta", label: "KPI Delta", description: "Period-over-period change" },
  { key: "kpiText", label: "KPI Text", description: "Custom text metrics" },
  { key: "funnel", label: "Funnel", description: "Conversion flows" },
  { key: "heatmap", label: "Heatmap", description: "Data intensity" },
  { key: "sankey", label: "Sankey", description: "Flow between states" },
  { key: "sunburst", label: "Sunburst", description: "Radial hierarchy" },
  { key: "retentionHeatmap", label: "Retention", description: "Cohort analysis" },
  { key: "markdown", label: "Markdown", description: "Rich text content" },
  { key: "table", label: "Data Table", description: "Tabular exploration" },
];

function ChartDemo({ config, height }: { config: ChartDemoConfig; height: number }) {
  const [displayConfig, setDisplayConfig] = useState<Record<string, unknown>>(
    () => ({ ...config.displayConfig })
  );

  const handleDisplayConfigChange = useCallback(
    (newConfig: Record<string, unknown>) => {
      setDisplayConfig(newConfig);
    },
    []
  );

  // Reset display config when chart type changes
  const chartType = config.chartType;

  return (
    <div className="chart-demo-interactive">
      {/* Chart */}
      <div className="chart-demo-chart">
        <LazyChart
          chartType={config.chartType as any}
          data={config.data as any[]}
          chartConfig={config.chartConfig}
          displayConfig={displayConfig}
          height={height}
          colorPalette={defaultColorPalette as any}
        />
      </div>

      {/* Config Panel */}
      <div className="chart-demo-config">
        <AnalysisDisplayConfigPanel
          chartType={config.chartType as any}
          displayConfig={displayConfig as any}
          colorPalette={defaultColorPalette as any}
          onDisplayConfigChange={handleDisplayConfigChange as any}
        />
      </div>
    </div>
  );
}

export default function ChartGallery() {
  const [selected, setSelected] = useState<string>("bar");

  const config = chartDemoRegistry[selected];
  const selectedInfo = chartTypes.find((c) => c.key === selected);
  const chartHeight = ["radialBar", "heatmap", "sankey", "sunburst", "retentionHeatmap"].includes(selected) ? 350 : 300;

  return (
    <CubeProvider apiOptions={{ baseUrl: "" }}>
    <div className="chart-gallery">
      {/* Icon grid */}
      <div className="chart-icon-grid">
        {chartTypes.map((ct) => {
          const Icon = getChartTypeIcon(ct.key);
          const isActive = ct.key === selected;
          return (
            <button
              key={ct.key}
              className={`chart-icon-btn${isActive ? " active" : ""}`}
              onClick={() => setSelected(ct.key)}
              title={ct.label}
            >
              <Icon className="chart-icon-svg" aria-hidden />
              <span className="chart-icon-label">{ct.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chart preview */}
      <div className="chart-preview-area">
        {config && <ChartDemo key={selected} config={config} height={chartHeight} />}
      </div>
    </div>
    </CubeProvider>
  );
}
