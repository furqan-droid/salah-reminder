/**
 * Salah Reminder v4.0 - Complete Application Logic
 * Includes: Strict 24-Hour Time Format across all languages, dynamic RTL/LTR writing direction, 
 * GPS Geolocation, Wake Lock API, and Advanced TTS Voice Matching.
 */

const translations = {
    ur: {
        title: "🕌 نماز یاد دہانی",
        subtitle: "ذاتی نماز کا وقت یاد دہانی",
        nextPrayer: "اگلی نماز",
        todayPrayers: "آج کے اوقات",
        trackerTitle: "📊 نماز ٹریکر",
        testBtn: "🔔 یاد دہانی ٹیسٹ کریں",
        reportBtn: "📈 رپورٹ دیکھیں",
        settingsBtn: "⚙️ ترتیبات",
        backBtn: "واپس ←",
        reportTitle: "📈 نماز کی ہفتہ وار رپورٹ",
        reportSummaryTitle: "پچھلے 7 دنوں کا خلاصہ",
        callHeader: "نماز کی یاد دہانی",
        callType: "آواز کال",
        answerBtn: "جواب دیں",
        laterBtn: "بعد میں",
        activeCallStatus: "جاری ہے...",
        endCallBtn: "کال ختم کریں",
        secNotifications: "🔔 نوٹیفکیشن",
        enableNotif: "براؤزر نوٹیفکیشن کی اجازت:",
        allowBtn: "اجازت دیں",
        firstReminderLabel: "پہلی یاد دہانی کا وقت:",
        secondReminderLabel: "دوسری یاد دہانی کا وقت:",
        secSound: "🎵 آواز اور رنگ ٹون",
        enableSound: "آواز فعال کریں",
        volumeLabel: "آواز کی سطح:",
        ringtoneLabel: "رنگ ٹون:",
        ringtoneChime: "نرم گھنٹی (Chime)",
        ringtoneBeep: "ڈیجیٹل بیپ (Beep)",
        ringtoneMelody: "ساز آور گھنٹی (Melody)",
        secProfile: "👤 ذاتی پروفائل",
        userNameLabel: "یاد دہانی کا نام:",
        secLocation: "🌍 مقام اور حساب کتاب",
        locationLabel: "شہر / مقام:",
        geoDetectBtn: "📍 GPS تلاش کریں",
        methodLabel: "حساب کتاب کا طریقہ:",
        saveBtn: "💾 ترتیبات محفوظ کریں",
        savedAlert: "✅ ترتیبات کامیابی سے محفوظ ہو گئیں!"
    },
    en: {
        title: "🕌 Salah Reminder",
        subtitle: "Personal Prayer Time Reminder",
        nextPrayer: "Next Prayer",
        todayPrayers: "Today's Times",
        trackerTitle: "📊 Prayer Tracker",
        testBtn: "🔔 Test Reminder",
        reportBtn: "📈 View Report",
        settingsBtn: "⚙️ Settings",
        backBtn: "Back →",
        reportTitle: "📈 Weekly Prayer Report",
        reportSummaryTitle: "Last 7 Days Summary",
        callHeader: "Prayer Reminder",
        callType: "Voice Call",
        answerBtn: "Answer",
        laterBtn: "Later",
        activeCallStatus: "Ongoing...",
        endCallBtn: "End Call",
        secNotifications: "🔔 Notifications",
        enableNotif: "Browser Notification Permission:",
        allowBtn: "Allow",
        firstReminderLabel: "First Reminder Time:",
        secondReminderLabel: "Second Reminder Time:",
        secSound: "🎵 Sound & Ringtone",
        enableSound: "Enable Sound",
        volumeLabel: "Volume Level:",
        ringtoneLabel: "Ringtone:",
        ringtoneChime: "Soft Chime",
        ringtoneBeep: "Digital Beep",
        ringtoneMelody: "Melody Ring",
        secProfile: "👤 Personal Profile",
        userNameLabel: "Reminder Name:",
        secLocation: "🌍 Location & Calculation",
        locationLabel: "City / Location:",
        geoDetectBtn: "📍 Detect GPS",
        methodLabel: "Calculation Method:",
        saveBtn: "💾 Save Settings",
        savedAlert: "✅ Settings saved successfully!"
    },
    ar: {
        title: "🕌 تذكرة الصلاة",
        subtitle: "تذكير شخصي بأوقات الصلاة",
        nextPrayer: "الصلاة القادمة",
        todayPrayers: "أوقات اليوم",
        trackerTitle: "📊 متتبع الصلاة",
        testBtn: "🔔 اختبار التذكير",
        reportBtn: "📈 عرض التقرير",
        settingsBtn: "⚙️ الإعدادات",
        backBtn: "رجوع ←",
        reportTitle: "📈 تقرير الصلاة الأسبوعي",
        reportSummaryTitle: "ملخص آخر 7 أيام",
        callHeader: "تذكير الصلاة",
        callType: "مكالمة صوتية",
        answerBtn: "رد",
        laterBtn: "لاحقاً",
        activeCallStatus: "جاري المكالمة...",
        endCallBtn: "إنهاء المكالمة",
        secNotifications: "🔔 الإشعارات",
        enableNotif: "إذن إشعارات المتصفح:",
        allowBtn: "سماح",
        firstReminderLabel: "وقت التذكير الأول:",
        secondReminderLabel: "وقت التذكير الثاني:",
        secSound: "🎵 الصوت ونغمة الرنين",
        enableSound: "تفعيل الصوت",
        volumeLabel: "مستوى الصوت:",
        ringtoneLabel: "نغمة الرنين:",
        ringtoneChime: "رنين هادئ",
        ringtoneBeep: "تنبيه رقمي",
        ringtoneMelody: "نغمة موسيقية",
        secProfile: "👤 الملف الشخصي",
        userNameLabel: "اسم الشخص للتذكير:",
        secLocation: "🌍 الموقع والحساب",
        locationLabel: "المدينة / الموقع:",
        geoDetectBtn: "📍 تحديد الموقع",
        methodLabel: "طريقة الحساب:",
        saveBtn: "💾 حفظ الإعدادات",
        savedAlert: "✅ تم حفظ الإعدادات بنجاح!"
    }
};

const defaultVoiceScripts = {
    en: {
        first: ["Attention {name}. {prayer} prayer time is approaching at {time}."],
        second: ["Assalamu Alaikum {name}. It is now time for {prayer} prayer at {time}."]
    },
    ar: {
        first: ["تنبيه {name}. اقتربت صلاة {prayer} في تمام الساعة {time}."],
        second: ["السلام عليكم {name}. حان الآن وقت صلاة {prayer} في تمام الساعة {time}."]
    },
    ur: {
        first: ["توجہ فرمائیں {name}۔ {prayer} کی نماز کا وقت {time} پر ہونے والا ہے۔"],
        second: ["السلام علیکم {name}۔ {prayer} کی نماز کا وقت {time} ہو چکا ہے۔"]
    }
};

const cityDatabase = {
    karachi: { lat: 24.8607, lng: 67.0011, tz: 5 },
    lahore: { lat: 31.5204, lng: 74.3587, tz: 5 },
    islamabad: { lat: 33.6844, lng: 73.0479, tz: 5 },
    makkah: { lat: 21.3891, lng: 39.8579, tz: 3 },
    madinah: { lat: 24.5247, lng: 39.5692, tz: 3 },
    dubai: { lat: 25.2048, lng: 55.2708, tz: 4 },
    london: { lat: 51.5074, lng: -0.1278, tz: 0 },
    newyork: { lat: 40.7128, lng: -74.0060, tz: -5 }
};

let calculator = new PrayerTimesCalculator();
let todayPrayers = {};
let nextPrayer = null;
let currentRingtone = null;
let wakeLock = null;

let currentLang = localStorage.getItem('lang') || 'ur';
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
let volume = parseFloat(localStorage.getItem('volume') || '0.8');
let ringtoneType = localStorage.getItem('ringtone') || 'chime';
let userName = localStorage.getItem('userName') || 'محمد';
let selectedCityKey = localStorage.getItem('cityKey') || 'karachi';
let customLat = parseFloat(localStorage.getItem('customLat') || '0');
let customLng = parseFloat(localStorage.getItem('customLng') || '0');
let calcMethod = localStorage.getItem('calcMethod') || 'Karachi';
let firstReminderTime = localStorage.getItem('firstReminderTime') || '05:00';
let secondReminderTime = localStorage.getItem('secondReminderTime') || '12:00';
let currentDateStr = new Date().toDateString();

document.addEventListener('DOMContentLoaded', () => {
    updateCitySettings(selectedCityKey);
    calculator.setMethod(calcMethod);
    initApp();
    updateClock();
    setInterval(updateClock, 1000);
    setInterval(checkReminders, 15000);
    loadSettingsUI();
    applyLanguage();
    updateNotificationStatus();

    if ('Notification' in window && Notification.permission === 'default') {
        setTimeout(showNotificationPrompt, 2000);
    }
});

function updateCitySettings(key) {
    if (key === 'custom' && customLat !== 0 && customLng !== 0) {
        const offset = -new Date().getTimezoneOffset() / 60;
        calculator.setLocation(customLat, customLng, offset);
    } else {
        const c = cityDatabase[key] || cityDatabase.karachi;
        calculator.setLocation(c.lat, c.lng, c.tz);
    }
}

function getSelectedCityTime() {
    let tzOffset = 5;
    if (selectedCityKey === 'custom') {
        tzOffset = -new Date().getTimezoneOffset() / 60;
    } else {
        const c = cityDatabase[selectedCityKey] || cityDatabase.karachi;
        tzOffset = c.tz;
    }
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utcTime + (3600000 * tzOffset));
}

function detectUserLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }
    navigator.geolocation.getCurrentPosition(position => {
        customLat = position.coords.latitude;
        customLng = position.coords.longitude;
        selectedCityKey = 'custom';
        
        localStorage.setItem('customLat', customLat);
        localStorage.setItem('customLng', customLng);
        localStorage.setItem('cityKey', 'custom');

        updateCitySettings('custom');
        initApp();
        alert("✅ GPS Location detected and applied successfully!");
    }, () => {
        alert("❌ Unable to retrieve your GPS location.");
    });
}

async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {}
    }
}

function releaseWakeLock() {
    if (wakeLock) {
        wakeLock.release().catch(() => {});
        wakeLock = null;
    }
}

function initApp() {
    const cityTime = getSelectedCityTime();
    currentDateStr = cityTime.toDateString();
    const times = calculator.getPrayerTimes(cityTime);
    const isJummah = calculator.isJummah(cityTime);

    const names = {
        ur: { fajr: 'فجر', zuhr: 'ظہر', jummah: 'جمعہ', asr: 'عصر', maghrib: 'مغرب', isha: 'عشاء' },
        en: { fajr: 'Fajr', zuhr: 'Zuhr', jummah: 'Jummah', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
        ar: { fajr: 'الفجر', zuhr: 'الظهر', jummah: 'الجمعة', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء' }
    };
    const l = names[currentLang] || names.ur;

    todayPrayers = {
        fajr: { name: l.fajr, time: times.fajr, key: 'fajr' },
        zuhr: isJummah ? { name: l.jummah, time: calculator.getJummahTime(), key: 'jummah' } : { name: l.zuhr, time: times.zuhr, key: 'zuhr' },
        asr: { name: l.asr, time: times.asr, key: 'asr' },
        maghrib: { name: l.maghrib, time: times.maghrib, key: 'maghrib' },
        isha: { name: l.isha, time: times.isha, key: 'isha' }
    };

    displayPrayerTimes();
    displayTracker();
    updateNextPrayer();
}

function displayPrayerTimes() {
    const list = document.getElementById('prayersList');
    if (!list) return;
    list.innerHTML = '';
    const cityTime = getSelectedCityTime();
    const nowMins = cityTime.getHours() * 60 + cityTime.getMinutes();

    for (let k in todayPrayers) {
        const p = todayPrayers[k];
        const [h, m] = p.time.split(':').map(Number);
        const passed = (h * 60 + m) < nowMins;

        const div = document.createElement('div');
        div.className = 'prayer-item' + (passed ? ' passed' : '');
        div.innerHTML = `<span class="prayer-name-small">${p.name}</span><span class="prayer-time-small">${formatTimeLocalized(p.time)}</span>`;
        list.appendChild(div);
    }
}

function displayTracker() {
    const trackerList = document.getElementById('trackerList');
    if (!trackerList) return;
    trackerList.innerHTML = '';
    
    const cityTime = getSelectedCityTime();
    const todayKey = cityTime.toDateString();
    const btnTextDone = currentLang === 'en' ? '✓ Completed' : (currentLang === 'ar' ? '✓ تم' : '✓ ادا کر لی');
    const btnTextPending = currentLang === 'en' ? '○ Pending' : (currentLang === 'ar' ? '○ باقي' : '○ باقی ہے');

    for (let k in todayPrayers) {
        const p = todayPrayers[k];
        const storageKey = `track_${todayKey}_${k}`;
        const isCompleted = localStorage.getItem(storageKey) === 'true';

        const div = document.createElement('div');
        div.className = 'prayer-item';

        div.innerHTML = `
            <span>${p.name}</span>
            <button onclick="togglePrayerStatus('${k}')" style="padding: 6px 14px; border-radius: 8px; border: none; cursor: pointer; font-weight: bold; background: ${isCompleted ? '#4CAF50' : 'rgba(255,255,255,0.2)'}; color: #fff;">
                ${isCompleted ? btnTextDone : btnTextPending}
            </button>
        `;
        trackerList.appendChild(div);
    }
}

function togglePrayerStatus(prayerKey) {
    const cityTime = getSelectedCityTime();
    const todayKey = cityTime.toDateString();
    const storageKey = `track_${todayKey}_${prayerKey}`;
    const currentStatus = localStorage.getItem(storageKey) === 'true';
    
    localStorage.setItem(storageKey, (!currentStatus).toString());
    displayTracker();
}

function showReportScreen() {
    document.getElementById('mainScreen').classList.remove('active');
    document.getElementById('reportScreen').classList.add('active');
    generateWeeklyReport();
}

function hideReportScreen() {
    document.getElementById('reportScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
}

function generateWeeklyReport() {
    const summaryEl = document.getElementById('weeklyReportSummary');
    if (!summaryEl) return;

    let totalCompleted = 0;
    let totalPossible = 0;
    const keys = ['fajr', 'zuhr', 'asr', 'maghrib', 'isha'];
    const cityTime = getSelectedCityTime();

    for (let i = 0; i < 7; i++) {
        const d = new Date(cityTime);
        d.setDate(d.getDate() - i);
        const dateStr = d.toDateString();

        keys.forEach(k => {
            totalPossible++;
            if (localStorage.getItem(`track_${dateStr}_${k}`) === 'true') {
                totalCompleted++;
            }
        });
    }

    const percentage = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
    
    if (currentLang === 'en') {
        summaryEl.innerHTML = `
            <p>🎯 <strong>Completed Prayers (Last 7 Days):</strong> ${totalCompleted} / ${totalPossible}</p>
            <p>📊 <strong>Success Rate:</strong> ${percentage}%</p>
            <p style="margin-top: 10px; opacity: 0.85; font-size: 0.95em;">Consistency in prayer is the key to success. May Allah accept your worship.</p>
        `;
    } else if (currentLang === 'ar') {
        summaryEl.innerHTML = `
            <p>🎯 <strong>الصلوات المؤداة (آخر 7 أيام):</strong> ${totalCompleted} / ${totalPossible}</p>
            <p>📊 <strong>نسبة النجاح:</strong> ${percentage}%</p>
            <p style="margin-top: 10px; opacity: 0.85; font-size: 0.95em;">المحافظة على الصلاة مفتاح الفلاح. تقبل الله طاعتكم.</p>
        `;
    } else {
        summaryEl.innerHTML = `
            <p>🎯 <strong>کل ادا شدہ نمازیں (پچھلے 7 دن):</strong> ${convertToUrduNumbers(totalCompleted)} / ${convertToUrduNumbers(totalPossible)}</p>
            <p>📊 <strong>کامیابی کی شرح:</strong> ${convertToUrduNumbers(percentage)}%</p>
            <p style="margin-top: 10px; opacity: 0.85; font-size: 0.95em;">نماز کی پابندی مومن کی سب سے بڑی کامیابی ہے۔ اللہ آپ کی عبادت کو قبول فرمائے۔</p>
        `;
    }
}

function updateNextPrayer() {
    const cityTime = getSelectedCityTime();
    const nowMins = cityTime.getHours() * 60 + cityTime.getMinutes();
    nextPrayer = null;

    for (let k in todayPrayers) {
        const p = todayPrayers[k];
        const [h, m] = p.time.split(':').map(Number);
        if ((h * 60 + m) > nowMins) {
            nextPrayer = p;
            break;
        }
    }

    if (!nextPrayer) {
        const tomorrow = new Date(cityTime);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tTimes = calculator.getPrayerTimes(tomorrow);
        const label = currentLang === 'en' ? 'Fajr (Tomorrow)' : (currentLang === 'ar' ? 'الفجر (غداً)' : 'فجر (کل)');
        nextPrayer = { name: label, time: tTimes.fajr, key: 'fajr_tomorrow' };
    }

    document.getElementById('nextPrayerName').textContent = nextPrayer.name;
    document.getElementById('nextPrayerTime').textContent = formatTimeLocalized(nextPrayer.time);
    updateTimeRemaining();
}

function updateTimeRemaining() {
    if (!nextPrayer) return;
    const cityTime = getSelectedCityTime();
    const [h, m] = nextPrayer.time.split(':').map(Number);
    const pTime = new Date(cityTime);
    pTime.setHours(h, m, 0, 0);
    if (pTime <= cityTime) pTime.setDate(pTime.getDate() + 1);

    const diff = pTime - cityTime;
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);

    let txt = '';
    if (currentLang === 'en') {
        txt = hours > 0 ? `${hours}h ${mins}m remaining` : `${mins}m remaining`;
    } else if (currentLang === 'ar') {
        txt = hours > 0 ? `متبقي ${hours} ساعة و ${mins} دقيقة` : `متبقي ${mins} دقيقة`;
    } else {
        txt = hours > 0 ? `${convertToUrduNumbers(hours)} گھنٹے ${convertToUrduNumbers(mins)} منٹ باقی` : `${convertToUrduNumbers(mins)} منٹ باقی`;
    }
    document.getElementById('timeRemaining').textContent = txt;
}

function updateClock() {
    const cityTime = getSelectedCityTime();
    if (cityTime.toDateString() !== currentDateStr) initApp();

    const hrs = String(cityTime.getHours()).padStart(2, '0');
    const mins = String(cityTime.getMinutes()).padStart(2, '0');
    const secs = String(cityTime.getSeconds()).padStart(2, '0');
    const tStr = `${hrs}:${mins}:${secs}`;

    document.getElementById('currentTime').textContent = (currentLang === 'ur' || currentLang === 'ar')
        ? convertToUrduNumbers(tStr)
        : tStr;

    const loc = { ur: 'ur-PK', en: 'en-US', ar: 'ar-SA' }[currentLang] || 'ur-PK';
    document.getElementById('currentDate').textContent = cityTime.toLocaleDateString(loc, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    updateTimeRemaining();
}

function checkReminders() {
    const cityTime = getSelectedCityTime();
    const nowStr = `${String(cityTime.getHours()).padStart(2, '0')}:${String(cityTime.getMinutes()).padStart(2, '0')}`;
    
    for (let k in todayPrayers) {
        const p = todayPrayers[k];
        
        if (nowStr === firstReminderTime || nowStr === secondReminderTime) {
            const isFirst = nowStr === firstReminderTime;
            const storageKey = `notif_${p.key}_${isFirst ? '1' : '2'}_${cityTime.toDateString()}`;
            if (!localStorage.getItem(storageKey)) {
                localStorage.setItem(storageKey, 'true');
                triggerSystemNotification(p, isFirst);
                showCallScreen(p, isFirst);
                displayPrayerTimes();
                displayTracker();
                updateNextPrayer();
            }
        }
    }
}

function triggerSystemNotification(prayer, isFirst) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const title = `${prayer.name}`;
        const targetTime = isFirst ? firstReminderTime : secondReminderTime;
        const body = isFirst
            ? (currentLang === 'en' ? `Reminder for ${prayer.name} at ${targetTime}` : `نماز ${prayer.name} کا یاد دہانی وقت (${targetTime}) ہو گیا ہے۔`)
            : (currentLang === 'en' ? `Second reminder for ${prayer.name} at ${targetTime}` : `دوسری یاد دہانی وقت (${targetTime})۔`);
        new Notification(title, { body, icon: 'icon-192.png', tag: `${prayer.key}_${isFirst ? 1 : 2}` });
    }
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            updateNotificationStatus();
            if (permission === 'granted') alert('✅ Notifications Enabled!');
        });
    }
}

function updateNotificationStatus() {
    const statusEl = document.getElementById('notificationStatus');
    if (!statusEl) return;
    if ('Notification' in window && Notification.permission === 'granted') {
        statusEl.innerHTML = currentLang === 'en' ? '✅ Notifications: Active' : (currentLang === 'ar' ? '✅ الإشعارات: مفعلة' : '✅ نوٹیفکیشن: فعال');
        statusEl.className = 'status-indicator active';
    } else {
        statusEl.innerHTML = currentLang === 'en' ? '❌ Notifications: Disabled' : (currentLang === 'ar' ? '❌ الإشعارات: معطلة' : '❌ نوٹیفکیشن: غیر فعال');
        statusEl.className = 'status-indicator inactive';
    }
}

function showNotificationPrompt() {
    if ('Notification' in window && Notification.permission === 'default') {
        if (confirm('کیا آپ نماز کے وقت بروقت یاد دہانی اور نوٹیفکیشن حاصل کرنا چاہتے ہیں؟')) {
            requestNotificationPermission();
        }
    }
}

function playRingtone() {
    stopRingtone();
    if (!soundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = ringtoneType === 'beep' ? 'square' : (ringtoneType === 'melody' ? 'triangle' : 'sine');
        osc.frequency.setValueAtTime(ringtoneType === 'melody' ? 659.25 : 523.25, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(volume * 0.2, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        
        let ringing = true;
        const interval = setInterval(() => {
            ringing = !ringing;
            gain.gain.setTargetAtTime(ringing ? volume * 0.2 : 0, audioCtx.currentTime, 0.05);
        }, ringtoneType === 'beep' ? 400 : 1000);
        
        const timeout = setTimeout(stopRingtone, 25000);
        currentRingtone = { osc, audioCtx, interval, timeout };
    } catch (e) {}
}

function stopRingtone() {
    if (currentRingtone) {
        clearInterval(currentRingtone.interval);
        clearTimeout(currentRingtone.timeout);
        try { currentRingtone.osc.stop(); currentRingtone.audioCtx.close(); } catch (e) {}
        currentRingtone = null;
    }
}

function showCallScreen(prayer, isFirst) {
    requestWakeLock();
    document.getElementById('mainScreen').classList.remove('active');
    document.getElementById('settingsScreen').classList.remove('active');
    if (document.getElementById('reportScreen')) document.getElementById('reportScreen').classList.remove('active');
    document.getElementById('callScreen').classList.add('active');
    document.getElementById('callPrayerName').textContent = prayer.name;
    document.getElementById('callPrayerTime').textContent = formatTimeLocalized(prayer.time);

    const targetTime = isFirst ? firstReminderTime : secondReminderTime;
    if (currentLang === 'en') {
        document.getElementById('callMessage').textContent = isFirst ? `Scheduled Reminder at ${targetTime}` : `Final Scheduled Call at ${targetTime}`;
    } else if (currentLang === 'ar') {
        document.getElementById('callMessage').textContent = isFirst ? `تذكير مجدول في الساعة ${targetTime}` : `نداء نهائي في الساعة ${targetTime}`;
    } else {
        document.getElementById('callMessage').textContent = isFirst ? `مقررہ یاد دہانی وقت: ${targetTime}` : `آخری مقررہ یاد دہانی وقت: ${targetTime}`;
    }
    window.currentPrayer = { prayer, isFirst };
    playRingtone();
}

async function isHeadsetConnected() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return false;
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.some(d => 
            d.kind === 'audiooutput' && 
            /headphone|headset|earphone|bluetooth|airpods|buds/i.test(d.label)
        );
    } catch (e) {
        return false;
    }
}

async function getDynamicReminderScript(lang, stage, prayerName) {
    let scriptPool = defaultVoiceScripts;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const response = await fetch(`reminders.json?t=${Date.now()}`, {
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const remoteData = await response.json();
            if (remoteData && remoteData[lang] && remoteData[lang][stage]) {
                scriptPool = remoteData;
                localStorage.setItem('cachedReminders', JSON.stringify(remoteData));
            }
        }
    } catch (err) {
        const cached = localStorage.getItem('cachedReminders');
        if (cached) {
            try { scriptPool = JSON.parse(cached); } catch (e) {}
        }
    }

    const langBlock = scriptPool[lang] || defaultVoiceScripts[lang] || defaultVoiceScripts.ur;
    const templates = langBlock[stage] || defaultVoiceScripts.ur[stage];
    const template = Array.isArray(templates)
        ? templates[Math.floor(Math.random() * templates.length)]
        : templates;

    const targetTime = stage === 'first' ? firstReminderTime : secondReminderTime;

    return template
        .replace(/\{name\}/g, userName)
        .replace(/\{prayer\}/g, prayerName)
        .replace(/\{time\}/g, targetTime);
}

function getBestVoice(langCode) {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const prefix = langCode.split('-')[0];
    return voices.find(v => v.lang.toLowerCase().includes(langCode.toLowerCase()) || v.lang.toLowerCase().includes(prefix)) || null;
}

async function answerCall() {
    stopRingtone();
    document.getElementById('callScreen').classList.remove('active');
    document.getElementById('activeCallScreen').classList.add('active');
    const { prayer, isFirst } = window.currentPrayer;
    document.getElementById('activePrayerName').textContent = prayer.name;

    const stage = isFirst ? 'first' : 'second';
    const text = await getDynamicReminderScript(currentLang, stage, prayer.name);

    document.getElementById('reminderText').innerHTML = `<p>${text}</p>`;
    
    const usingEarphones = await isHeadsetConnected();
    const badge = document.getElementById('audioOutputBadge');
    if (badge) {
        if (usingEarphones) {
            badge.style.display = 'block';
            badge.textContent = currentLang === 'en' ? '🎧 Headset Mode (In-Ear)' : (currentLang === 'ar' ? '🎧 وضع سماعة الرأس' : '🎧 ہیڈسیٹ موڈ (کان میں)');
        } else {
            badge.style.display = 'none';
        }
    }

    if ('speechSynthesis' in window && soundEnabled) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        
        const langMap = { ur: 'ur-PK', en: 'en-US', ar: 'ar-SA' };
        const targetLangCode = langMap[currentLang] || 'ur-PK';
        u.lang = targetLangCode;
        
        const bestVoice = getBestVoice(targetLangCode);
        if (bestVoice) u.voice = bestVoice;

        if (usingEarphones) {
            u.volume = Math.min(1, volume * 0.55);
            u.pitch = 0.95;
            u.rate = 1.02;
        } else {
            u.volume = volume;
            u.pitch = 1.0;
            u.rate = 0.98;
        }

        u.onend = () => {
            releaseWakeLock();
            setTimeout(endCall, 2000);
        };
        window.speechSynthesis.speak(u);
    }
}

function dismissCall() {
    stopRingtone();
    releaseWakeLock();
    document.getElementById('callScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
}

function endCall() {
    stopRingtone();
    releaseWakeLock();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    document.getElementById('activeCallScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
}

function testReminder() {
    const name = currentLang === 'en' ? 'Zuhr' : (currentLang === 'ar' ? 'الظهر' : 'ظہر');
    showCallScreen({ name, time: '13:00', key: 'test' }, true);
}

function showSettings() { document.getElementById('mainScreen').classList.remove('active'); document.getElementById('settingsScreen').classList.add('active'); }
function hideSettings() { document.getElementById('settingsScreen').classList.remove('active'); document.getElementById('mainScreen').classList.add('active'); }

function updateLanguage(v) {
    currentLang = v;
    localStorage.setItem('lang', currentLang);
    applyLanguage();
    initApp();
    updateNotificationStatus();
}

function saveSettings() {
    currentLang = document.getElementById('langSelect').value;
    soundEnabled = document.getElementById('soundEnabled').checked;
    volume = parseInt(document.getElementById('volumeControl').value, 10) / 100;
    ringtoneType = document.getElementById('ringtoneSelect').value;
    userName = document.getElementById('userNameInput').value || 'محمد';
    selectedCityKey = document.getElementById('citySelect').value;
    calcMethod = document.getElementById('methodSelect').value;
    firstReminderTime = document.getElementById('firstReminderInput').value || '05:00';
    secondReminderTime = document.getElementById('secondReminderInput').value || '12:00';

    localStorage.setItem('lang', currentLang);
    localStorage.setItem('soundEnabled', soundEnabled);
    localStorage.setItem('volume', volume);
    localStorage.setItem('ringtone', ringtoneType);
    localStorage.setItem('userName', userName);
    localStorage.setItem('cityKey', selectedCityKey);
    localStorage.setItem('calcMethod', calcMethod);
    localStorage.setItem('firstReminderTime', firstReminderTime);
    localStorage.setItem('secondReminderTime', secondReminderTime);

    updateCitySettings(selectedCityKey);
    calculator.setMethod(calcMethod);
    applyLanguage();
    initApp();

    const t = translations[currentLang] || translations.ur;
    alert(t.savedAlert);
    hideSettings();
}

function applyLanguage() {
    const t = translations[currentLang] || translations.ur;
    document.documentElement.lang = currentLang;
    
    // Switch document direction automatically (RTL for Urdu/Arabic, LTR for English)
    const isRtl = (currentLang === 'ur' || currentLang === 'ar');
    document.documentElement.dir = isRtl ? "rtl" : "ltr";

    document.getElementById('headerTitle').textContent = t.title;
    document.getElementById('headerSubtitle').textContent = t.subtitle;
    document.getElementById('nextPrayerTitle').textContent = t.nextPrayer;
    document.getElementById('todayPrayersTitle').textContent = t.todayPrayers;
    if (document.getElementById('trackerTitle')) document.getElementById('trackerTitle').textContent = t.trackerTitle;
    document.getElementById('testBtn').textContent = t.testBtn;
    if (document.getElementById('reportBtn')) document.getElementById('reportBtn').textContent = t.reportBtn;
    document.getElementById('settingsBtn').textContent = t.settingsBtn;
    document.getElementById('backBtn').textContent = t.backBtn;
    document.getElementById('reportBackBtn').textContent = t.backBtn;
    document.getElementById('settingsTitle').textContent = t.settingsBtn;
    document.getElementById('reportTitle').textContent = t.reportTitle;
    document.getElementById('reportSummaryTitle').textContent = t.reportSummaryTitle;
    document.getElementById('callHeaderTitle').textContent = t.callHeader;
    document.getElementById('callTypeLabel').textContent = t.callType;
    document.getElementById('answerText').textContent = t.answerBtn;
    document.getElementById('laterText').textContent = t.laterBtn;
    document.getElementById('activeCallStatusLabel').textContent = t.activeCallStatus;
    document.getElementById('endCallText').textContent = t.endCallBtn;

    document.getElementById('lblNotifGroup').textContent = t.secNotifications;
    document.getElementById('lblEnableNotif').textContent = t.enableNotif;
    document.getElementById('btnNotifPerm').textContent = t.allowBtn;
    document.getElementById('lblFirstRem').textContent = t.firstReminderLabel;
    document.getElementById('lblSecondRem').textContent = t.secondReminderLabel;
    document.getElementById('lblSoundGroup').textContent = t.secSound;
    document.getElementById('lblSoundActive').textContent = t.enableSound;
    document.getElementById('lblVolumeText').textContent = t.volumeLabel;
    document.getElementById('lblRingtoneText').textContent = t.ringtoneLabel;
    document.getElementById('optChime').textContent = t.ringtoneChime;
    document.getElementById('optBeep').textContent = t.ringtoneBeep;
    document.getElementById('optMelody').textContent = t.ringtoneMelody;
    document.getElementById('lblProfileGroup').textContent = t.secProfile;
    document.getElementById('lblUserName').textContent = t.userNameLabel;
    document.getElementById('lblLocationGroup').textContent = t.secLocation;
    document.getElementById('lblCityText').textContent = t.locationLabel;
    document.getElementById('lblGeoText').textContent = t.geoDetectBtn;
    document.getElementById('lblMethodText').textContent = t.methodLabel;
    document.getElementById('saveSettingsBtn').textContent = t.saveBtn;
}

function loadSettingsUI() {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = currentLang;
    document.getElementById('soundEnabled').checked = soundEnabled;
    const volPct = Math.round(volume * 100);
    document.getElementById('volumeControl').value = volPct;
    document.getElementById('volumeValue').textContent = `${volPct}%`;
    document.getElementById('ringtoneSelect').value = ringtoneType;
    document.getElementById('userNameInput').value = userName;
    document.getElementById('citySelect').value = selectedCityKey;
    document.getElementById('methodSelect').value = calcMethod;
    document.getElementById('firstReminderInput').value = firstReminderTime;
    document.getElementById('secondReminderInput').value = secondReminderTime;
}

function formatTimeLocalized(time) {
    const [h, m] = time.split(':');
    const hourStr = String(parseInt(h, 10)).padStart(2, '0');
    const minStr = String(parseInt(m, 10)).padStart(2, '0');
    const formatted24 = `${hourStr}:${minStr}`;

    if (currentLang === 'ur' || currentLang === 'ar') {
        return convertToUrduNumbers(formatted24);
    }
    return formatted24;
}

function convertToUrduNumbers(num) {
    const d = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).split('').map(c => (c >= '0' && c <= '9') ? d[parseInt(c, 10)] : c).join('');
}
