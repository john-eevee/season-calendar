import { describe, it, expect } from 'vitest';
import {
    getSeason,
    getSeasonStart,
    getSeasonEnd,
    getDaysInSeason,
    getDayOfSeason,
    getOrdinalSuffix,
    getSeasonIcon
} from '../src/season';

describe('Unit Tests - getSeason', () => {
    it('should return Winter for January in northern hemisphere', () => {
        expect(getSeason('northern', new Date(2026, 0, 15))).toBe('Winter');
    });

    it('should return Summer for January in southern hemisphere', () => {
        expect(getSeason('southern', new Date(2026, 0, 15))).toBe('Summer');
    });

    it('should return Spring for April in northern hemisphere', () => {
        expect(getSeason('northern', new Date(2026, 3, 15))).toBe('Spring');
    });

    it('should return Autumn for April in southern hemisphere', () => {
        expect(getSeason('southern', new Date(2026, 3, 15))).toBe('Autumn');
    });

    it('should return Summer for July in northern hemisphere', () => {
        expect(getSeason('northern', new Date(2026, 6, 15))).toBe('Summer');
    });

    it('should return Winter for July in southern hemisphere', () => {
        expect(getSeason('southern', new Date(2026, 6, 15))).toBe('Winter');
    });

    it('should return Autumn for October in northern hemisphere', () => {
        expect(getSeason('northern', new Date(2026, 9, 15))).toBe('Autumn');
    });

    it('should return Spring for October in southern hemisphere', () => {
        expect(getSeason('southern', new Date(2026, 9, 15))).toBe('Spring');
    });

    it('should handle spring equinox (March 20)', () => {
        expect(getSeason('northern', new Date(2026, 2, 20))).toBe('Spring');
    });

    it('should handle winter solstice (December 21)', () => {
        expect(getSeason('northern', new Date(2026, 11, 21))).toBe('Winter');
    });
});

describe('Unit Tests - getSeasonStart', () => {
    it('should return March 20 for Spring in northern hemisphere', () => {
        const date = new Date(2026, 3, 15);
        const start = getSeasonStart('northern', 'Spring', date);
        expect(start.getFullYear()).toBe(2026);
        expect(start.getMonth()).toBe(2);
        expect(start.getDate()).toBe(20);
    });

    it('should return previous year for Winter in early January', () => {
        const date = new Date(2026, 0, 15);
        const start = getSeasonStart('northern', 'Winter', date);
        expect(start.getFullYear()).toBe(2025);
        expect(start.getMonth()).toBe(11);
        expect(start.getDate()).toBe(21);
    });

    it('should return December 21 for Summer in southern hemisphere in January', () => {
        const date = new Date(2026, 0, 15);
        const start = getSeasonStart('southern', 'Summer', date);
        expect(start.getFullYear()).toBe(2025);
        expect(start.getMonth()).toBe(11);
        expect(start.getDate()).toBe(21);
    });
});

describe('Unit Tests - getSeasonEnd', () => {
    it('should return June 20 for Spring in northern hemisphere', () => {
        const date = new Date(2026, 3, 15);
        const end = getSeasonEnd('northern', 'Spring', date);
        expect(end.getFullYear()).toBe(2026);
        expect(end.getMonth()).toBe(5);
        expect(end.getDate()).toBe(20);
    });

    it('should return next year for Winter in late December', () => {
        const date = new Date(2026, 11, 25);
        const end = getSeasonEnd('northern', 'Winter', date);
        expect(end.getFullYear()).toBe(2027);
        expect(end.getMonth()).toBe(2);
        expect(end.getDate()).toBe(19);
    });
});

describe('Unit Tests - getDaysInSeason', () => {
    it('should return correct number of days for Spring', () => {
        const date = new Date(2026, 3, 15);
        const days = getDaysInSeason('northern', 'Spring', date);
        expect(days).toBeGreaterThan(90);
        expect(days).toBeLessThan(93);
    });

    it('should return correct number of days for Summer', () => {
        const date = new Date(2026, 6, 15);
        const days = getDaysInSeason('northern', 'Summer', date);
        expect(days).toBeGreaterThan(90);
        expect(days).toBeLessThan(94);
    });

    it('should return correct number of days for Winter in southern hemisphere', () => {
        const date = new Date(2026, 6, 15);
        const days = getDaysInSeason('southern', 'Winter', date);
        expect(days).toBeGreaterThan(90);
        expect(days).toBeLessThan(94);
    });
});

describe('Unit Tests - getDayOfSeason', () => {
    it('should return 1 on first day of season', () => {
        const date = new Date(2026, 2, 20);
        const day = getDayOfSeason('northern', 'Spring', date);
        expect(day).toBe(1);
    });

    it('should return correct day number mid-season', () => {
        const date = new Date(2026, 4, 20);
        const day = getDayOfSeason('northern', 'Spring', date);
        expect(day).toBeGreaterThan(60);
        expect(day).toBeLessThan(63);
    });

    it('should handle southern hemisphere Summer correctly', () => {
        const date = new Date(2026, 0, 15);
        const day = getDayOfSeason('southern', 'Summer', date);
        expect(day).toBeGreaterThan(20);
        expect(day).toBeLessThan(30);
    });
});

describe('Unit Tests - getOrdinalSuffix', () => {
    it('should return "st" for 1', () => {
        expect(getOrdinalSuffix(1)).toBe('st');
    });

    it('should return "nd" for 2', () => {
        expect(getOrdinalSuffix(2)).toBe('nd');
    });

    it('should return "rd" for 3', () => {
        expect(getOrdinalSuffix(3)).toBe('rd');
    });

    it('should return "th" for 4', () => {
        expect(getOrdinalSuffix(4)).toBe('th');
    });

    it('should return "th" for 11', () => {
        expect(getOrdinalSuffix(11)).toBe('th');
    });

    it('should return "th" for 12', () => {
        expect(getOrdinalSuffix(12)).toBe('th');
    });

    it('should return "th" for 13', () => {
        expect(getOrdinalSuffix(13)).toBe('th');
    });

    it('should return "st" for 21', () => {
        expect(getOrdinalSuffix(21)).toBe('st');
    });
});

describe('Unit Tests - getSeasonIcon', () => {
    it('should return flower for Spring', () => {
        expect(getSeasonIcon('Spring')).toBe('🌸');
    });

    it('should return sun for Summer', () => {
        expect(getSeasonIcon('Summer')).toBe('☀️');
    });

    it('should return leaf for Autumn', () => {
        expect(getSeasonIcon('Autumn')).toBe('🍂');
    });

    it('should return snowflake for Winter', () => {
        expect(getSeasonIcon('Winter')).toBe('❄️');
    });
});

describe('Integration Tests', () => {
    it('should correctly calculate day of season across year boundary', () => {
        const date = new Date(2026, 0, 15);
        const season = getSeason('northern', date);
        const dayOfSeason = getDayOfSeason('northern', season, date);
        const daysInSeason = getDaysInSeason('northern', season, date);
        
        expect(season).toBe('Winter');
        expect(dayOfSeason).toBeGreaterThan(20);
        expect(dayOfSeason).toBeLessThan(daysInSeason);
    });

    it('should correctly calculate southern hemisphere Summer across year boundary', () => {
        const date = new Date(2026, 1, 1);
        const season = getSeason('southern', date);
        const dayOfSeason = getDayOfSeason('southern', season, date);
        const daysInSeason = getDaysInSeason('southern', season, date);
        
        expect(season).toBe('Summer');
        expect(dayOfSeason).toBeGreaterThan(40);
        expect(dayOfSeason).toBeLessThan(daysInSeason);
    });

    it('should handle full season cycle in northern hemisphere', () => {
        const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
        const testDates = [
            new Date(2026, 0, 15),
            new Date(2026, 4, 15),
            new Date(2026, 7, 15),
            new Date(2026, 10, 15)
        ];

        testDates.forEach((date, i) => {
            const season = getSeason('northern', date);
            const dayOfSeason = getDayOfSeason('northern', season, date);
            const daysInSeason = getDaysInSeason('northern', season, date);
            
            expect(season).toBe(seasons[i]);
            expect(dayOfSeason).toBeGreaterThan(0);
            expect(dayOfSeason).toBeLessThanOrEqual(daysInSeason);
        });
    });

    it('should handle full season cycle in southern hemisphere', () => {
        const seasons = ['Summer', 'Autumn', 'Winter', 'Spring'];
        const testDates = [
            new Date(2026, 0, 15),
            new Date(2026, 4, 15),
            new Date(2026, 7, 15),
            new Date(2026, 10, 15)
        ];

        testDates.forEach((date, i) => {
            const season = getSeason('southern', date);
            const dayOfSeason = getDayOfSeason('southern', season, date);
            const daysInSeason = getDaysInSeason('southern', season, date);
            
            expect(season).toBe(seasons[i]);
            expect(dayOfSeason).toBeGreaterThan(0);
            expect(dayOfSeason).toBeLessThanOrEqual(daysInSeason);
        });
    });

    it('should not return negative day numbers', () => {
        const dates = [
            new Date(2026, 0, 1),
            new Date(2026, 11, 31),
            new Date(2025, 0, 1),
            new Date(2027, 0, 1)
        ];

        dates.forEach(date => {
            const northernSeason = getSeason('northern', date);
            const northernDay = getDayOfSeason('northern', northernSeason, date);
            const southernSeason = getSeason('southern', date);
            const southernDay = getDayOfSeason('southern', southernSeason, date);
            
            expect(northernDay).toBeGreaterThan(0);
            expect(southernDay).toBeGreaterThan(0);
        });
    });

    it('should correctly calculate progress percentage', () => {
        const date = new Date(2026, 7, 1);
        const season = getSeason('northern', date);
        const dayOfSeason = getDayOfSeason('northern', season, date);
        const daysInSeason = getDaysInSeason('northern', season, date);
        const progress = (dayOfSeason / daysInSeason) * 100;
        
        expect(progress).toBeGreaterThan(40);
        expect(progress).toBeLessThan(60);
    });

    it('should handle leap years correctly', () => {
        const feb29 = new Date(2024, 1, 29);
        const season = getSeason('northern', feb29);
        const dayOfSeason = getDayOfSeason('northern', season, feb29);
        const daysInSeason = getDaysInSeason('northern', season, feb29);
        
        expect(dayOfSeason).toBeGreaterThan(0);
        expect(dayOfSeason).toBeLessThanOrEqual(daysInSeason);
    });
});
