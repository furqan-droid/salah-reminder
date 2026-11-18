/**
 * Salah Reminder v3.3 - Complete Application Logic
 * Includes: Dynamic Internet-Synced Voice Scripts (with offline fallback),
 * Headset/Earphone Mode Detection, Multi-language (Urdu/English/Arabic),
 * Urdu digit conversion, Custom Reminder Offsets, AudioContext Ringtones,
 * Web Push Notifications, Interactive Prayer Tracker, and Weekly Summary Report.
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
        backBtn: "← واپس",
        callHeader: "نماز کی یاد دہانی",
        callType: "آواز کال",
        answerBtn: "جواب دیں",
        laterBtn: "بعد میں",
        activeCallStatus: "جاری ہے...",
        endCallBtn: "کال ختم کریں",
        secNotifications: "🔔 نوٹیفکیشن",
        enableNotif: "براؤزر نوٹیفکیشن کی اجازت:",
        allowBtn: "اجازت دیں",
        firstReminderLabel: "پہلی یاد دہانی (منٹ پہلے):",
        secondReminderLabel: "دوسری یاد دہانی (منٹ):",
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
        methodLabel: "حساب کتاب کا طریقہ:"
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
        backBtn: "← Back",
        callHeader: "Prayer Reminder",
        callType: "Voice Call",
        answerBtn: "Answer",
        laterBtn: "Later",
        activeCallStatus: "Ongoing...",
        endCallBtn: "End Call",
        secNotifications: "🔔 Notifications",
        enableNotif: "Browser Notification Permission:",
        allowBtn: "Allow",
        firstReminderLabel: "First Reminder (Mins Before):",
        secondReminderLabel: "Second Reminder (Offset Mins):",
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
        methodLabel: "Calculation Method:"
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
        backBtn: "← رجوع",
        callHeader: "تذكير الصلاة",
        callType: "مكالمة صوتية",
        answerBtn: "رد",
        laterBtn: "لاحقاً",
        activeCallStatus: "جاري المكالمة...",
        endCallBtn: "إنهاء المكالمة",
        secNotifications: "🔔 الإشعارات",
        enableNotif: "إذن إشعارات المتصفح:",
        allowBtn: "سماح",
        firstReminderLabel: "التذكير الأول (دقائق قبل):",
        secondReminderLabel: "التذكير الثاني (دقائق):",
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
        methodLabel: "طريقة الحساب:"
    }
};

// Built-in offline fallback scripts
const defaultVoiceScripts = {
    en: {
        first: ["Attention {name}. {prayer} prayer is coming up in {mins} minutes. Please finish your tasks and get ready for Wudu."],
        second: ["Assalamu Alaikum {name}. It is now time for {prayer} prayer. Please rise and proceed for Salah. May Allah accept your worship."]
    },
    ar: {
        first: ["تنبيه {name}. اقتربت صلاة {prayer} خلال {mins} دقائق. يرجى الاستعداد للوضوء."],
        second: ["السلام عليكم {name}. حان الآن وقت صلاة {prayer}. تقبل الله طاعتكم."]
    },
    ur: {
        first: ["توجہ فرمائیں {name}۔ {prayer} کی نماز میں {mins} منٹ باقی ہیں۔ براہ کرم اپنے کام ختم کر کے وضو کی تیاری کریں۔"],
        second: ["السلام علیکم {name}۔ {prayer} کی نماز کا وقت ہو چکا ہے۔ اللہ ہمیں باجماعت نماز کی توفیق عطا فرمائے۔"]
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

let currentLang = localStorage.getItem('lang') || document.getElementById('langSelect')?.value || 'ur';
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
let volume = parseFloat(localStorage.getItem('volume') || '0.8');
let ringtoneType = localStorage.getItem('ringtone') || 'chime';
let userName = localStorage.getItem('userName') || 'محمد';
let selectedCityKey = localStorage.getItem('cityKey') || 'karachi';
let calcMethod = localStorage.getItem('calcMethod') || 'Karachi';
let firstReminderMins = parseInt(localStorage.getItem('firstReminderMins') || '5', 10);
let secondReminderOffset = parseInt(localStorage.getItem('secondReminderOffset') || '0', 10);
let currentDateStr = new Date().toDateString();

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        currentLang = localStorage.getItem('lang') || langSelect.value;
        langSelect.value = currentLang;
    }

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
    const c = cityDatabase[key] || cityDatabase.karachi;
    calculator.setLocation(c.lat, c.lng, c.tz);
}

function initApp() {
    currentDateStr = new Date().toDateString();
    const times = calculator.getPrayerTimes(new Date());
    const isJummah = calculator.isJummah(new Date());

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
    const nowMins = new Date().getHours() * 60 + new Date().getMinutes();

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
    
    const todayKey = new Date().toDateString();
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
    const todayKey = new Date().toDateString();
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

    for (let i = 0; i < 7; i++) {
        const d = new Date();
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
    const nowMins = new Date().getHours() * 60 + new Date().getMinutes();
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
        const tomorrow = new Date();
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
    const now = new Date();
    const [h, m] = nextPrayer.time.split(':').map(Number);
    const pTime = new Date();
    pTime.setHours(h, m, 0, 0);
    if (pTime <= now) pTime.setDate(pTime.getDate() + 1);

    const diff = pTime - now;
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
    const now = new Date();
    if (now.toDateString() !== currentDateStr) initApp();

    const tStr = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('currentTime').textContent = (currentLang === 'ur') ? convertToUrduNumbers(tStr) : tStr;

    const loc = { ur: 'ur-PK', en: 'en-US', ar: 'ar-SA' }[currentLang] || 'ur-PK';
    document.getElementById('currentDate').textContent = now.toLocaleDateString(loc, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    updateTimeRemaining();
}

function addMinutes(timeStr, mins) {
    const [h, m] = timeStr.split(':').map(Number);
    let total = (h * 60 + m + mins) % 1440;
    if (total < 0) total += 1440;
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function checkReminders() {
    const nowStr = `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`;
    
    for (let k in todayPrayers) {
        const p = todayPrayers[k];
        const r1 = addMinutes(p.time, -firstReminderMins);
        const r2 = addMinutes(p.time, secondReminderOffset);
        
        if (nowStr === r1 || nowStr === r2) {
            const isFirst = nowStr === r1;
            const storageKey = `notif_${p.key}_${isFirst ? '1' : '2'}_${new Date().toDateString()}`;
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
        const body = isFirst
            ? (currentLang === 'en' ? `${firstReminderMins} mins remaining until ${prayer.name}` : `نماز کا وقت ہونے میں ${firstReminderMins} منٹ باقی ہیں۔`)
            : (currentLang === 'en' ? `It is time for ${prayer.name}` : `نماز کا وقت ہو گیا ہے (${formatTimeLocalized(prayer.time)})۔`);
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
    document.getElementById('mainScreen').classList.remove('active');
    document.getElementById('settingsScreen').classList.remove('active');
    if (document.getElementById('reportScreen')) document.getElementById('reportScreen').classList.remove('active');
    document.getElementById('callScreen').classList.add('active');
    document.getElementById('callPrayerName').textContent = prayer.name;
    document.getElementById('callPrayerTime').textContent = formatTimeLocalized(prayer.time);

    if (currentLang === 'en') {
        document.getElementById('callMessage').textContent = isFirst ? `Heads up: ${firstReminderMins} mins remaining` : `Final Call: It is time for prayer`;
    } else if (currentLang === 'ar') {
        document.getElementById('callMessage').textContent = isFirst ? `تنبيه: متبقي ${firstReminderMins} دقائق` : `نداء نهائي: حان وقت الصلاة`;
    } else {
        document.getElementById('callMessage').textContent = isFirst ? `پہلی یاد دہانی: نماز میں ${convertToUrduNumbers(firstReminderMins)} منٹ باقی ہیں` : `آخری یاد دہانی: نماز کا وقت ہو گیا ہے`;
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

    const formattedMins = (lang === 'ur' || lang === 'ar')
        ? convertToUrduNumbers(firstReminderMins)
        : firstReminderMins;

    return template
        .replace(/\{name\}/g, userName)
        .replace(/\{prayer\}/g, prayerName)
        .replace(/\{mins\}/g, formattedMins);
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
        u.lang = { ur: 'ur-PK', en: 'en-US', ar: 'ar-SA' }[currentLang] || 'ur-PK';

        if (usingEarphones) {
            u.volume = Math.min(1, volume * 0.55);
            u.pitch = 0.95;
            u.rate = 1.02;
        } else {
            u.volume = volume;
            u.pitch = 1.0;
            u.rate = 0.98;
        }

        u.onend = () => setTimeout(endCall, 2000);
        window.speechSynthesis.speak(u);
    }
}

function dismissCall() {
    stopRingtone();
    document.getElementById('callScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
}

function endCall() {
    stopRingtone();
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

function applyLanguage() {
    const t = translations[currentLang] || translations.ur;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = (currentLang === 'en') ? 'ltr' : 'rtl';

    document.getElementById('headerTitle').textContent = t.title;
    document.getElementById('headerSubtitle').textContent = t.subtitle;
    document.getElementById('nextPrayerTitle').textContent = t.nextPrayer;
    document.getElementById('todayPrayersTitle').textContent = t.todayPrayers;
    if (document.getElementById('trackerTitle')) document.getElementById('trackerTitle').textContent = t.trackerTitle;
    document.getElementById('testBtn').textContent = t.testBtn;
    if (document.getElementById('reportBtn')) document.getElementById('reportBtn').textContent = t.reportBtn;
    document.getElementById('settingsBtn').textContent = t.settingsBtn;
    document.getElementById('backBtn').textContent = t.backBtn;
    document.getElementById('settingsTitle').textContent = t.settingsBtn;
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
    document.getElementById('lblMethodText').textContent = t.methodLabel;
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
    document.getElementById('firstReminderInput').value = firstReminderMins;
    document.getElementById('secondReminderInput').value = secondReminderOffset;
}

function updateLanguage(v) { 
    localStorage.setItem('lang', v); 
    currentLang = v; 
    applyLanguage(); 
    initApp(); 
    updateNotificationStatus(); 
}
function updateSoundSetting() { soundEnabled = document.getElementById('soundEnabled').checked; localStorage.setItem('soundEnabled', soundEnabled); }
function updateVolume() { const v = document.getElementById('volumeControl').value; volume = v / 100; document.getElementById('volumeValue').textContent = `${v}%`; localStorage.setItem('volume', volume); }
function updateRingtone() { ringtoneType = document.getElementById('ringtoneSelect').value; localStorage.setItem('ringtone', ringtoneType); }
function updateUserName() { userName = document.getElementById('userNameInput').value || 'محمد'; localStorage.setItem('userName', userName); }
function updateCity() { selectedCityKey = document.getElementById('citySelect').value; localStorage.setItem('cityKey', selectedCityKey); updateCitySettings(selectedCityKey); initApp(); }
function updateMethod() { calcMethod = document.getElementById('methodSelect').value; localStorage.setItem('calcMethod', calcMethod); calculator.setMethod(calcMethod); initApp(); }
function updateFirstReminder() { firstReminderMins = parseInt(document.getElementById('firstReminderInput').value, 10) || 0; localStorage.setItem('firstReminderMins', firstReminderMins); }
function updateSecondReminder() { secondReminderOffset = parseInt(document.getElementById('secondReminderInput').value, 10) || 0; localStorage.setItem('secondReminderOffset', secondReminderOffset); }

function formatTimeLocalized(time) {
    const [h, m] = time.split(':');
    let hour = parseInt(h, 10);
    if (currentLang === 'en') {
        const p = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return `${hour}:${m} ${p}`;
    } else if (currentLang === 'ar') {
        const p = hour >= 12 ? 'مساءً' : 'صباحاً';
        hour = hour % 12 || 12;
        return `${convertToUrduNumbers(hour)}:${convertToUrduNumbers(m)} ${p}`;
    } else {
        const p = hour >= 12 ? 'بجے' : 'صبح';
        hour = hour % 12 || 12;
        return `${convertToUrduNumbers(hour)}:${convertToUrduNumbers(m)} ${p}`;
    }
}

function convertToUrduNumbers(num) {
    const d = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).split('').map(c => (c >= '0' && c <= '9') ? d[parseInt(c, 10)] : c).join('');
}

setInterval(() => {
    const todayStr = new Date().toDateString();
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('notif_') && !key.includes(todayStr)) {
            localStorage.removeItem(key);
        }
    }
}, 3600000);
