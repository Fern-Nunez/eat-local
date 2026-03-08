
interface KpiCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  suffix?: string;
}

export default function KpiCard({
  title,
  value,
  trend,
  icon,
  iconBg,
  iconColor,
  suffix,
}: KpiCardProps) {
  const isPositive = trend >= 0;
  const trendColor = isPositive ? "text-emerald-400" : "text-red-400";
  const trendIcon = isPositive ? "ri-arrow-up-line" : "ri-arrow-down-line";

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center`}>
          <i className={`${icon} text-xl ${iconColor}`}></i>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
          <i className={`${trendIcon} text-base`}></i>
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-white text-2xl font-bold">
        {value}
        {suffix && (
          <span className="text-lg font-medium text-gray-300 ml-1">{suffix}</span>
        )}
      </p>
      <p className="text-gray-500 text-xs mt-1">vs. last period</p>
    </div>
  );
}
