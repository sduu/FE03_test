class Timer {
    constructor(container) {
        this.container = container;
        this.btnStart = this.container.querySelector('.btn-start');
        this.btnReset = this.container.querySelector('.btn-reset');
        this.btnStop = this.container.querySelector('.btn-stop');
        this.hours = 0;
        this.minute = 0;
        this.second = 0;
        this.isTimerActive = false;
        this.timer = null;
    }

    init() {
        this.setControlBtn();
        this.bindEvent();
    }

    bindEvent() {
        const timerItems = this.container.querySelectorAll('.timer-item');
        [...timerItems].forEach(item => {
            item.addEventListener('click', () => this.addTime(item));
        });
        this.btnStart.addEventListener('click', () => this.startTimer());
        this.btnStop.addEventListener('click', () => this.stopTimer());
        this.btnReset.addEventListener('click', () => this.resetTimer());
    }

    setTimeFormat(n) {
        return n < 10 ? '0' + n : n;
    }

    setTimeItem() {
        const hours = this.container.querySelector('.hours span');
        const minute = this.container.querySelector('.minute span');
        const second = this.container.querySelector('.second span');

        hours.textContent = `${this.setTimeFormat(this.hours)}`;
        minute.textContent = `${this.setTimeFormat(this.minute)}`;
        second.textContent = `${this.setTimeFormat(this.second)}`;
    }

    addTime(item) {
        const targetClass = item.classList;

        if (targetClass.contains('hours')) this.hours++;
        if (targetClass.contains('minute')) this.minute++;
        if (targetClass.contains('second')) this.second += 10;

        if (this.second >= 60) {
            this.second = 0;
            this.minute++;
        }

        if (this.minute >= 60) {
            this.minute = 0;
            this.hours++;
        }

        this.setTimeItem();
        this.setControlBtn();
    }

    setControlBtn() {
        if (this.isTimerActive) {
            this.btnStart.style.display = 'none';
            this.btnStop.style.display = 'block';
        } else {
            this.btnStart.style.display = 'block';
            this.btnStop.style.display = 'none';
        }

        if (this.hours || this.minute || this.second) {
            this.btnStart.disabled = false;
            this.btnReset.disabled = false;
        } else if (!(this.hours + this.minute + this.second)) {
            this.btnStart.disabled = true;
            this.btnReset.disabled = true;
        }
    }

    startTimer() {
        this.isTimerActive = true;

        this.setTimeItem();
        this.setControlBtn();

        this.timer = setInterval(() => {
            this.second--;

            if ((this.second < 0 && this.minute) || this.hours) {
                this.second = 59;
                this.minute--;
                if (this.minute < 0 && this.hours) {
                    this.minute = 59;
                    this.hours--;
                }
            } else if (this.second < 0) {
                this.second = 0;
                this.stopTimer();
            }

            this.setTimeItem();
        }, 1000);
    }

    stopTimer() {
        this.isTimerActive = false;
        clearInterval(this.timer);
        this.timer = null;
        this.setControlBtn();
    }

    resetTimer() {
        this.hours = 0;
        this.minute = 0;
        this.second = 0;
        this.setTimeItem();
        this.stopTimer();
    }
}

const timer = new Timer(document.querySelector('.main-cont'));
timer.init();
