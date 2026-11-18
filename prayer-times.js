/**
 * Advanced Prayer Times Calculator
 * Supports multiple cities, calculation methods, and juristic settings
 */

class PrayerTimesCalculator {
    constructor(lat, lng, tz, methodParams) {
        this.latitude = lat !== undefined ? lat : 24.8607;
        this.longitude = lng !== undefined ? lng : 67.0011;
        this.timezone = tz !== undefined ? tz : 5;
        this.params = methodParams || { fajrAngle: 18, ishaAngle: 18, asrFactor: 2 };
    }

    setLocation(lat, lng, tz) {
        this.latitude = lat;
        this.longitude = lng;
        this.timezone = tz;
    }

    setMethod(methodName) {
        if (methodName === 'MWL') {
            this.params = { fajrAngle: 18, ishaAngle: 17, asrFactor: 1 };
        } else if (methodName === 'ISNA') {
            this.params = { fajrAngle: 15, ishaAngle: 15, asrFactor: 1 };
        } else if (methodName === 'Makkah') {
            this.params = { fajrAngle: 18.5, ishaAngle: '90 min', asrFactor: 1 };
        } else if (methodName === 'Tehran') {
            this.params = { fajrAngle: 17.7, ishaAngle: 14, asrFactor: 1 };
        } else {
            this.params = { fajrAngle: 18, ishaAngle: 18, asrFactor: 2 };
        }
    }

    getPrayerTimes(date) {
        const jDate = this.julianDate(date);
        const times = this.computePrayerTimes(jDate);
        return {
            fajr: times.fajr,
            sunrise: times.sunrise,
            zuhr: times.dhuhr,
            asr: times.asr,
            maghrib: times.maghrib,
            isha: times.isha
        };
    }

    isJummah(date) { return date.getDay() === 5; }
    getJummahTime() { return '12:45'; }

    julianDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        const day = date.getDate();
        if (month <= 2) { year -= 1; month += 12; }
        const A = Math.floor(year / 100);
        const B = 2 - A + Math.floor(A / 4);
        return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
    }

    computePrayerTimes(jDate) {
        const d = jDate - 2451545.0;
        const g = 357.529 + 0.98560028 * d;
        const q = 280.459 + 0.98564736 * d;
        const L = q + 1.915 * Math.sin(this.rad(g)) + 0.020 * Math.sin(this.rad(2 * g));
        const e = 23.439 - 0.00000036 * d;
        const RA = this.deg(Math.atan2(Math.cos(this.rad(e)) * Math.sin(this.rad(L)), Math.cos(this.rad(L)))) / 15;
        const eqt = q / 15 - this.fixHour(RA);
        const decl = this.deg(Math.asin(Math.sin(this.rad(e)) * Math.sin(this.rad(L))));
        const noonUTC = 12 - eqt - (this.longitude / 15);

        const dhuhr = noonUTC;
        const sunrise = this.sunAngleTime(90.83333, decl, noonUTC, 'sunrise');
        const sunset = this.sunAngleTime(90.83333, decl, noonUTC, 'sunset');
        const fajr = this.sunAngleTime(90 + this.params.fajrAngle, decl, noonUTC, 'sunrise');
        const isha = typeof this.params.ishaAngle === 'number'
            ? this.sunAngleTime(90 + this.params.ishaAngle, decl, noonUTC, 'sunset')
            : sunset + (90 / 60);
        const asr = this.asrTime(this.params.asrFactor, decl, noonUTC);

        return {
            fajr: this.fmt(fajr, this.timezone),
            sunrise: this.fmt(sunrise, this.timezone),
            dhuhr: this.fmt(dhuhr, this.timezone),
            asr: this.fmt(asr, this.timezone),
            maghrib: this.fmt(sunset, this.timezone),
            isha: this.fmt(isha, this.timezone)
        };
    }

    sunAngleTime(angle, decl, noonUTC, direction) {
        const lat = this.latitude;
        const cosHour = (Math.cos(this.rad(angle)) - Math.sin(this.rad(decl)) * Math.sin(this.rad(lat))) / 
                        (Math.cos(this.rad(decl)) * Math.cos(this.rad(lat)));
        if (cosHour > 1 || cosHour < -1) return noonUTC;
        const hour = this.deg(Math.acos(cosHour)) / 15;
        return direction === 'sunrise' ? noonUTC - hour : noonUTC + hour;
    }

    asrTime(shadowFactor, decl, noonUTC) {
        const lat = this.latitude;
        const sunAltitude = this.deg(Math.atan(1 / (shadowFactor + Math.tan(this.rad(Math.abs(lat - decl))))));
        return this.sunAngleTime(90 - sunAltitude, decl, noonUTC, 'sunset');
    }

    fmt(timeUTC, offset) {
        let localTime = this.fixHour(timeUTC + offset);
        let mins = Math.round(localTime * 60);
        let h = Math.floor(mins / 60) % 24;
        let m = mins % 60;
        return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
    }

    rad(d) { return d * Math.PI / 180; }
    deg(r) { return r * 180 / Math.PI; }
    fixHour(h) { return h - 24 * Math.floor(h / 24); }
}
