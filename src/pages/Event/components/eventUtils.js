/**
 * Utility to parse dates in DD/MM/YYYY or DD-MM-YYYY formats.
 * Falls back to native parsing if needed.
 */
export function parseDate(dateStr) {
  if (!dateStr) return new Date(0);
  const cleanStr = dateStr.trim();
  const parts = cleanStr.split(/[-/]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month - 1, day);
    }
  }
  return new Date(dateStr);
}

/**
 * Utility to determine event category based on title/description keywords.
 * Returns both category name and light-theme Tailwind classes for badges.
 */
export function getEventCategory(event) {
  const text = `${event.title} ${event.description || ''} ${event.big_description || ''}`.toLowerCase();
  
  if (text.includes("hack") || text.includes("build") || text.includes("tech") || text.includes("explor")) {
    return {
      name: "Hackathon / Tech",
      bg: "bg-violet-50 text-violet-600 border border-violet-200"
    };
  }
  if (text.includes("talk") || text.includes("panel") || text.includes("dialog") || text.includes("chat") || text.includes("huddle")) {
    return {
      name: "Talk / Panel",
      bg: "bg-indigo-50 text-indigo-600 border border-indigo-200"
    };
  }
  if (text.includes("hiring") || text.includes("career") || text.includes("resume") || text.includes("intern")) {
    return {
      name: "Career / Hiring",
      bg: "bg-emerald-50 text-emerald-600 border border-emerald-200"
    };
  }
  if (text.includes("workshop") || text.includes("bootcamp") || text.includes("learn") || text.includes("toolup") || text.includes("sketchup")) {
    return {
      name: "Workshop",
      bg: "bg-orange-50 text-orange-600 border border-orange-200"
    };
  }
  return {
    name: "Community",
    bg: "bg-blue-50 text-blue-600 border border-blue-200"
  };
}
