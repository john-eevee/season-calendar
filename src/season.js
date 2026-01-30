export function getHemisphere() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lat = parseFloat(timezone.split('/')[1]?.replace(/_/g, ' ')) || 0;
    
    if (timezone.toLowerCase().includes('australia') ||
        timezone.toLowerCase().includes('new zealand') ||
        timezone.toLowerCase().includes('south africa') ||
        timezone.toLowerCase().includes('argentina') ||
        timezone.toLowerCase().includes('chile') ||
        timezone.toLowerCase().includes('brazil') ||
        timezone.toLowerCase().includes('antarctica')) {
        return 'southern';
    }
    
    const region = new Intl.Locale(navigator.language).region;
    const southernCountries = ['AU', 'NZ', 'ZA', 'AR', 'CL', 'BR', 'ZA', 'AU', 'PG', 'FJ', 'SB'];
    
    if (region && southernCountries.includes(region)) {
        return 'southern';
    }
    
    const latitude = getLatitude();
    if (latitude < 0) return 'southern';
    
    return 'northern';
}

export function getLatitude() {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone && timezone.includes('/')) {
            const city = timezone.split('/')[1];
            const latMap = {
                'Sydney': -33.87,
                'Melbourne': -37.81,
                'Brisbane': -27.47,
                'Perth': -31.95,
                'Auckland': -36.85,
                'Wellington': -41.29,
                'Johannesburg': -26.20,
                'Cape_Town': -33.92,
                'Buenos_Aires': -34.60,
                'Santiago': -33.45,
                'Sao_Paulo': -23.55,
                'Rio_de_Janeiro': -22.91,
                'London': 51.51,
                'Paris': 48.86,
                'Berlin': 52.52,
                'Madrid': 40.42,
                'Rome': 41.90,
                'New_York': 40.71,
                'Los_Angeles': 34.05,
                'Chicago': 41.88,
                'Toronto': 43.65,
                'Vancouver': 49.28,
                'Tokyo': 35.68,
                'Seoul': 37.57,
                'Beijing': 39.90,
                'Shanghai': 31.23,
                'Mumbai': 19.08,
                'Delhi': 28.61,
                'Dubai': 25.20,
                'Moscow': 55.76,
            };
            return latMap[city] || 0;
        }
    } catch (e) {}
    return 0;
}

export function getSeason(hemisphere, date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (hemisphere === 'northern') {
        if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) {
            return 'Spring';
        } else if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 23)) {
            return 'Summer';
        } else if ((month === 9 && day >= 23) || month === 10 || month === 11 || (month === 12 && day < 21)) {
            return 'Autumn';
        } else {
            return 'Winter';
        }
    } else {
        if ((month === 9 && day >= 23) || month === 10 || month === 11 || (month === 12 && day < 21)) {
            return 'Spring';
        } else if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 20)) {
            return 'Summer';
        } else if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) {
            return 'Autumn';
        } else {
            return 'Winter';
        }
    }
}

export function getSeasonStart(hemisphere, season, currentDate) {
    const year = currentDate.getFullYear();
    if (hemisphere === 'northern') {
        const starts = {
            'Spring': new Date(year, 2, 20),
            'Summer': new Date(year, 5, 21),
            'Autumn': new Date(year, 8, 23),
            'Winter': new Date(year, 11, 21)
        };
        const start = starts[season];
        if (start > currentDate) start.setFullYear(year - 1);
        return start;
    } else {
        const starts = {
            'Spring': new Date(year, 8, 23),
            'Summer': new Date(year, 11, 21),
            'Autumn': new Date(year, 2, 20),
            'Winter': new Date(year, 5, 21)
        };
        const start = starts[season];
        if (start > currentDate) start.setFullYear(year - 1);
        return start;
    }
}

export function getSeasonEnd(hemisphere, season, currentDate) {
    const year = currentDate.getFullYear();
    if (hemisphere === 'northern') {
        const ends = {
            'Spring': new Date(year, 5, 20),
            'Summer': new Date(year, 8, 22),
            'Autumn': new Date(year, 11, 20),
            'Winter': new Date(year, 2, 19)
        };
        const end = ends[season];
        if (end <= currentDate) end.setFullYear(year + 1);
        return end;
    } else {
        const ends = {
            'Spring': new Date(year, 11, 20),
            'Summer': new Date(year, 2, 19),
            'Autumn': new Date(year, 5, 20),
            'Winter': new Date(year, 8, 22)
        };
        const end = ends[season];
        if (end <= currentDate) end.setFullYear(year + 1);
        return end;
    }
}

export function getDaysInSeason(hemisphere, season, currentDate) {
    const start = getSeasonStart(hemisphere, season, currentDate);
    const end = getSeasonEnd(hemisphere, season, currentDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export function getDayOfSeason(hemisphere, season, currentDate) {
    const start = getSeasonStart(hemisphere, season, currentDate);
    const diffTime = currentDate - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
}

export function getOrdinalSuffix(n) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export function getSeasonIcon(season) {
    const icons = {
        'Spring': '🌸',
        'Summer': '☀️',
        'Autumn': '🍂',
        'Winter': '❄️'
    };
    return icons[season];
}

export function formatCurrentDate(date) {
    return date.toLocaleDateString(navigator.language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function updateDisplay() {
    const now = new Date();
    const hemisphere = getHemisphere();
    const season = getSeason(hemisphere, now);
    const dayOfSeason = getDayOfSeason(hemisphere, season, now);
    const daysInSeason = getDaysInSeason(hemisphere, season, now);
    const progress = (dayOfSeason / daysInSeason) * 100;

    document.getElementById('hemisphere').textContent = hemisphere === 'northern' ? 'Northern Hemisphere' : 'Southern Hemisphere';
    document.getElementById('season').textContent = season;
    document.getElementById('dayNumber').textContent = dayOfSeason;
    document.getElementById('seasonIcon').textContent = getSeasonIcon(season);
    document.getElementById('dateInfo').textContent = formatCurrentDate(now);
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${Math.round(progress)}% of ${season} complete`;
}
