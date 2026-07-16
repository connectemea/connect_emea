/**
 * Utility to parse dates in YYYY-MM-DD (Supabase) or DD/MM/YYYY (legacy) formats.
 * Falls back to native parsing if needed.
 */
export function parseDate(dateStr) {
  if (!dateStr) return new Date(0);
  const cleanStr = dateStr.trim();
  const parts = cleanStr.split(/[-/]/);
  if (parts.length === 3) {
    const p0 = parseInt(parts[0], 10);
    const p1 = parseInt(parts[1], 10);
    const p2 = parseInt(parts[2], 10);
    if (!isNaN(p0) && !isNaN(p1) && !isNaN(p2)) {
      // Detect format: if first part is 4 digits → YYYY-MM-DD (ISO)
      // otherwise → DD/MM/YYYY or DD-MM-YYYY
      if (parts[0].length === 4) {
        return new Date(p0, p1 - 1, p2); // YYYY-MM-DD
      } else {
        const year = parts[2].length === 2 ? 2000 + p2 : p2;
        return new Date(year, p1 - 1, p0); // DD/MM/YYYY
      }
    }
  }
  return new Date(dateStr);
}

/**
 * Format a date string into a human-readable format (e.g. "Aug 7, 2025").
 * Handles both YYYY-MM-DD and DD/MM/YYYY inputs.
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = parseDate(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
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
