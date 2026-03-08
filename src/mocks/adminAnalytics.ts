
export const kpiData = {
  totalVisitors: 48320,
  totalVisitorsTrend: 12.4,
  pageViews: 187450,
  pageViewsTrend: 8.7,
  avgSessionDuration: "3m 42s",
  avgSessionDurationTrend: 5.2,
  bounceRate: 34.8,
  bounceRateTrend: -2.1,
  conversionRate: 6.3,
  conversionRateTrend: 1.8,
  newVisitors: 29840,
  returningVisitors: 18480,
};

export const dailyVisitors = [
  { date: "Jun 1", visitors: 1240, pageViews: 4820 },
  { date: "Jun 2", visitors: 1380, pageViews: 5310 },
  { date: "Jun 3", visitors: 1520, pageViews: 5890 },
  { date: "Jun 4", visitors: 1190, pageViews: 4620 },
  { date: "Jun 5", visitors: 1650, pageViews: 6340 },
  { date: "Jun 6", visitors: 1820, pageViews: 7010 },
  { date: "Jun 7", visitors: 2100, pageViews: 8120 },
  { date: "Jun 8", visitors: 1940, pageViews: 7480 },
  { date: "Jun 9", visitors: 2240, pageViews: 8650 },
  { date: "Jun 10", visitors: 2080, pageViews: 8020 },
  { date: "Jun 11", visitors: 1760, pageViews: 6790 },
  { date: "Jun 12", visitors: 1920, pageViews: 7410 },
  { date: "Jun 13", visitors: 2350, pageViews: 9060 },
  { date: "Jun 14", visitors: 2580, pageViews: 9940 },
];

export const trafficSources = [
  { source: "Organic Search", percentage: 42, visitors: 20294, color: "#F97316" },
  { source: "Direct", percentage: 24, visitors: 11597, color: "#14B8A6" },
  { source: "Social Media", percentage: 18, visitors: 8698, color: "#F59E0B" },
  { source: "Referral", percentage: 11, visitors: 5315, color: "#8B5CF6" },
  { source: "Email", percentage: 5, visitors: 2416, color: "#EC4899" },
];

export const topPages = [
  { page: "/", title: "Home", views: 52340, percentage: 27.9, trend: "up" },
  { page: "/map-finder", title: "Map Finder", views: 38920, percentage: 20.8, trend: "up" },
  { page: "/restaurants", title: "Restaurants", views: 31450, percentage: 16.8, trend: "up" },
  { page: "/ingredients", title: "Ingredients", views: 24680, percentage: 13.2, trend: "down" },
  { page: "/cooking-videos", title: "Cooking Videos", views: 21340, percentage: 11.4, trend: "up" },
  { page: "/review", title: "Reviews", views: 18720, percentage: 10.0, trend: "up" },
];

export const topCities = [
  { city: "New York, NY", visitors: 9240, percentage: 19.1 },
  { city: "Los Angeles, CA", visitors: 7820, percentage: 16.2 },
  { city: "Chicago, IL", visitors: 5640, percentage: 11.7 },
  { city: "San Francisco, CA", visitors: 4980, percentage: 10.3 },
  { city: "Washington, DC", visitors: 3760, percentage: 7.8 },
];

export const engagementData = {
  pagesPerSession: 3.9,
  avgTimeOnPage: "2m 18s",
  scrollDepth: 68,
  returnVisitorRate: 38.2,
};

export const pageEngagement = [
  { page: "Home", avgTime: "2m 45s", scrollDepth: 72, sessions: 52340 },
  { page: "Map Finder", avgTime: "4m 12s", scrollDepth: 85, sessions: 38920 },
  { page: "Restaurants", avgTime: "3m 38s", scrollDepth: 78, sessions: 31450 },
  { page: "Ingredients", avgTime: "5m 02s", scrollDepth: 91, sessions: 24680 },
  { page: "Cooking Videos", avgTime: "6m 24s", scrollDepth: 88, sessions: 21340 },
  { page: "Reviews", avgTime: "3m 15s", scrollDepth: 74, sessions: 18720 },
];

export const topSearchTerms = [
  { term: "authentic italian restaurant", count: 3420 },
  { term: "mexican food near me", count: 2980 },
  { term: "korean bbq", count: 2540 },
  { term: "indian curry", count: 2210 },
  { term: "thai food", count: 1980 },
  { term: "ethiopian restaurant", count: 1640 },
  { term: "vietnamese pho", count: 1520 },
  { term: "greek taverna", count: 1380 },
];

export const conversionFunnel = [
  { step: "Total Visitors", count: 48320, rate: 100, color: "#F97316" },
  { step: "Restaurant Views", count: 31450, rate: 65.1, color: "#FB923C" },
  { step: "Map Finder Opens", count: 18920, rate: 39.2, color: "#FDBA74" },
  { step: "Review Submissions", count: 4280, rate: 8.9, color: "#14B8A6" },
  { step: "Video Submissions", count: 1840, rate: 3.8, color: "#2DD4BF" },
];

export const goalCompletions = [
  { goal: "Reviews Submitted", count: 4280, target: 5000, color: "#14B8A6" },
  { goal: "Videos Submitted", count: 1840, target: 2000, color: "#F97316" },
  { goal: "Restaurant Submissions", count: 920, target: 1000, color: "#F59E0B" },
  { goal: "Newsletter Signups", count: 3640, target: 4000, color: "#8B5CF6" },
];

export const browserData = [
  { browser: "Chrome", percentage: 58, users: 28026, color: "#F97316" },
  { browser: "Safari", percentage: 22, users: 10630, color: "#14B8A6" },
  { browser: "Firefox", percentage: 11, users: 5315, color: "#F59E0B" },
  { browser: "Edge", percentage: 7, users: 3382, color: "#8B5CF6" },
  { browser: "Other", percentage: 2, users: 967, color: "#94A3B8" },
];

export const deviceData = [
  { device: "Desktop", percentage: 52, users: 25126, color: "#F97316" },
  { device: "Mobile", percentage: 38, users: 18362, color: "#14B8A6" },
  { device: "Tablet", percentage: 10, users: 4832, color: "#F59E0B" },
];

export const pageLoadTimes = [
  { page: "Home", loadTime: 1.24, status: "good" },
  { page: "Map Finder", loadTime: 1.87, status: "good" },
  { page: "Restaurants", loadTime: 1.42, status: "good" },
  { page: "Ingredients", loadTime: 2.31, status: "needs-improvement" },
  { page: "Cooking Videos", loadTime: 2.68, status: "needs-improvement" },
  { page: "Reviews", loadTime: 1.56, status: "good" },
];

export const coreWebVitals = [
  { metric: "LCP", value: "1.8s", status: "good", description: "Largest Contentful Paint", threshold: "< 2.5s" },
  { metric: "FID", value: "42ms", status: "good", description: "First Input Delay", threshold: "< 100ms" },
  { metric: "CLS", value: "0.08", status: "needs-improvement", description: "Cumulative Layout Shift", threshold: "< 0.1" },
  { metric: "TTFB", value: "320ms", status: "good", description: "Time to First Byte", threshold: "< 600ms" },
];

export const errorData = [
  { type: "404 Not Found", count: 142, trend: "down" },
  { type: "JS Errors", count: 38, trend: "down" },
  { type: "API Timeouts", count: 12, trend: "up" },
  { type: "Image Load Fails", count: 24, trend: "down" },
];

export const behaviorFlow = [
  { step: 1, name: "Landing Page", users: 48320, dropOff: 0 },
  { step: 2, name: "Browse Restaurants", users: 31450, dropOff: 34.9 },
  { step: 3, name: "Map Finder", users: 18920, dropOff: 39.8 },
  { step: 4, name: "View Details", users: 11240, dropOff: 40.6 },
  { step: 5, name: "Write Review", users: 4280, dropOff: 61.9 },
];
