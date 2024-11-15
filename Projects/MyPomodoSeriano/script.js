let timer;
let workTime = 25 * 60; // 25 dakika
let breakTime = 5 * 60;  // 5 dakika
let longBreakTime = 15 * 60; // 15 dakika
let isWorking = true;
let isPaused = false;

// Zaman formatını güncelle
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Zamanlayıcıyı başlat
function startTimer() {
    isPaused = false;
    clearInterval(timer);

    timer = setInterval(() => {
        if (isWorking) {
            workTime--;
            if (workTime === 0) {
                alert("Break time!");
                isWorking = false;
                workTime = 25 * 60;
                breakTime = 5 * 60;
                addRecordToCSV("Work");
            }
        } else {
            breakTime--;
            if (breakTime === 0) {
                alert("Back to work!");
                isWorking = true;
                breakTime = 5 * 60;
                addRecordToCSV("Break");
            }
        }
        updateDisplay();
    }, 1000);
}

// Ekranda süreyi güncelle
function updateDisplay() {
    const time = isWorking ? workTime : breakTime;
    document.getElementById("timerDisplay").textContent = formatTime(time);
}

// Zamanlayıcıyı duraklat
function pauseTimer() {
    clearInterval(timer);
    isPaused = true;
}

// Zamanlayıcıyı sıfırla
function resetTimer() {
    clearInterval(timer);
    workTime = 25 * 60;
    breakTime = 5 * 60;
    isWorking = true;
    isPaused = false;
    updateDisplay();
}

// Kısa mola başlat
function shortBreak() {
    clearInterval(timer);
    breakTime = 5 * 60;
    isWorking = false;
    updateDisplay();
    startTimer();
}

// Uzun mola başlat
function longBreak() {
    clearInterval(timer);
    breakTime = longBreakTime;
    isWorking = false;
    updateDisplay();
    startTimer();
}

// CSV dosyasına kayıt ekle
function addRecordToCSV(type) {
    const workName = document.getElementById("workName").value;
    const date = new Date().toLocaleDateString('tr-TR');
    const time = new Date().toLocaleTimeString('tr-TR');

    // Yeni CSV içeriğini oluştur
    const csvContent = `${date};${time};${workName};${type}\n`;
    const file = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Dosyayı indir
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'workTimeRecord.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("CSV dosyası başarıyla oluşturuldu.");
}
