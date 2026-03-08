
import { useState } from 'react';
import KpiCard from './KpiCard';
import MiniLineChart from './MiniLineChart';
import {
  kpiData,
  dailyVisitors,
  trafficSources,
  topPages,
} from '../../../mocks/adminAnalytics';

export default function OverviewTab() {
  const [chartMetric, setChartMetric] = useState<'visitors' | 'pageViews'>('visitors');

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <KpiCard
          title="Total Visitors"
          value={kpiData.totalVisitors.toLocaleString()}
          trend={kpiData.totalVisitorsTrend}
          icon="ri-user-line"
          iconBg="bg-orange-500/20"
          iconColor="text-orange-400"
        />
        <KpiCard
          title="Page Views"
          value={kpiData.pageViews.toLocaleString()}
          trend={kpiData.pageViewsTrend}
          icon="ri-eye-line"
          iconBg="bg-teal-500/20"
          iconColor="text-teal-400"
        />
        <KpiCard
          title="Avg. Session"
          value={kpiData.avgSessionDuration}
          trend={kpiData.avgSessionDurationTrend}
          icon="ri-time-line"
          iconBg="bg-amber-500/20"
          iconColor="text-amber-400"
        />
        <KpiCard
          title="Bounce Rate"
          value={kpiData.bounceRate}
          trend={kpiData.bounceRateTrend}
          icon="ri-logout-box-r-line"
          iconBg="bg-pink-500/20"
          iconColor="text-pink-400"
          suffix="%"
        />
        <KpiCard
          title="Conversion Rate"
          value={kpiData.conversionRate}
          trend={kpiData.conversionRateTrend}
          icon="ri-exchange-line"
          iconBg="bg-violet-500/20"
          iconColor="text-violet-400"
          suffix="%"
        />
      </div>

      {/* Visitor Chart */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg">Traffic Volume</h3>
            <p className="text-gray-400 text-sm mt-0.5">Daily visitors & page views over selected period</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setChartMetric('visitors')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                chartMetric === 'visitors'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Visitors
            </button>
            <button
              onClick={() => setChartMetric('pageViews')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                chartMetric === 'pageViews'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Page Views
            </button>
          </div>
        </div>
        <div className="h-32">
          <MiniLineChart
            data={dailyVisitors}
            metric={chartMetric}
            color={chartMetric === 'visitors' ? '#F97316' : '#14B8A6'}
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold text-lg mb-5">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((src) => (
              <div key={src.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: src.color }}
                    />
                    <span className="text-gray-300 text-sm">{src.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-xs">{src.visitors.toLocaleString()}</span>
                    <span className="text-white text-sm font-semibold w-10 text-right">{src.percentage}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${src.percentage}%`, backgroundColor: src.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold text-lg mb-5">Top Pages</h3>
          <div className="space-y-3">
            {topPages.map((pg, i) => (
              <div key={pg.page} className="flex items-center gap-3">
                <span className="text-gray-600 text-xs w-4 text-right">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm truncate">{pg.title}</span>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-gray-400 text-xs">{pg.views.toLocaleString()}</span>
                      <i
                        className={`text-xs ${
                          pg.trend === 'up' ? 'ri-arrow-up-line text-emerald-400' : 'ri-arrow-down-line text-red-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${pg.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visitor Split */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <i className="ri-user-add-line text-xl text-teal-400"></i>
          </div>
          <div>
            <p className="text-gray-400 text-sm">New Visitors</p>
            <p className="text-white text-xl font-bold">{kpiData.newVisitors.toLocaleString()}</p>
            <p className="text-teal-400 text-xs mt-0.5">61.8% of total</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <i className="ri-user-follow-line text-xl text-orange-400"></i>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Returning Visitors</p>
            <p className="text-white text-xl font-bold">{kpiData.returningVisitors.toLocaleString()}</p>
            <p className="text-orange-400 text-xs mt-0.5">38.2% of total</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <i className="ri-pages-line text-xl text-amber-400"></i>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Pages / Session</p>
            <p className="text-white text-xl font-bold">3.9</p>
            <p className="text-amber-400 text-xs mt-0.5">+0.4 vs last period</p>
          </div>
        </div>
      </div>
    </div>
  );
}
