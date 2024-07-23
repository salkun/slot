const symbols = [
    "🍒", "🍋", "🍉", "🍇", "🍓", "🍍", "🍏", "🍆", "🍈", "🥭", "🍑",
    "🍎", "🍊", "🍐", "🍔", "🍕", "🍲", "🍜", "🍱", "🍣", "🍙", "🍚", 
    "🍛", "🍝", "🍠", "🍢", "🍥", "🍘", "🍿", "🥟", "🥠", "🥡", "🥢", 
    "🥣", "🥤", "🍶", "🍵", "🍴", "🍽", "🥄", "🍩", "🍪", "🍫", "🍬", 
    "🍭", "🍮", "🍯", "🍰", "🎂", "🍨", "🍧", "🍡", "🍦"
  ];
  
  const values = {
    "🍒": 1000,
    "🍋": 500,
    "🍉": 2000,
    "🍇": 3000,
    "🍓": 1500,
    "🍍": 2500,
    "🍏": 800,
    "🍆": 1200,
    "🍈": 1800,
    "🥭": 2200,
    "🍑": 10000, // Nilai jackpot yang lebih tinggi
    "🍎": 600,
    "🍊": 700,
    "🍐": 800,
    "🍔": 1000,
    "🍕": 1100,
    "🍲": 1200,
    "🍜": 1300,
    "🍱": 1400,
    "🍣": 1500,
    "🍛": 1600,
    "🍝": 1700,
    "🍠": 1800,
    "🍢": 1900,
    "🍥": 2000,
    "🍘": 2100,
    "🍿": 2200,
    "🥟": 2300,
    "🥠": 2400,
    "🥡": 2500,
    "🥢": 2600,
    "🥣": 2700,
    "🥤": 2800,
    "🍶": 2900,
    "🍵": 3000,
    "🍴": 3100,
    "🍽": 3200,
    "🥄": 3300,
    "🍩": 3400,
    "🍪": 3500,
    "🍫": 3600,
    "🍬": 3700,
    "🍭": 3800,
    "🍮": 3900,
    "🍯": 4000,
    "🍰": 4100,
    "🎂": 4200,
    "🍨": 4300,
    "🍧": 4400,
    "🍡": 4500,
    "🍦": 4600
  };
  
  let balance = 0;
  let spinning = false;
  let spinCost = 1000; // Updated to use a variable bet amount
  let spinCount = 0;
  let jackpotSpinCount = 0;
  let autoSpinCount = 0;
  
  // Fungsi untuk memperbarui saldo
  function updateBalance(amount) {
    balance += amount;
    document.getElementById("balance").innerText = balance.toLocaleString();
  }
  
  // Fungsi untuk mendapatkan simbol acak
  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  
  // Fungsi untuk mengatur jumlah bet
  function setBetAmount(amount) {
    spinCost = amount;
    alert(`atur jumlah bet menjadi Rp ${amount.toLocaleString()}`);
  }
  
  // Fungsi utama untuk melakukan spin
  function spin() {
    if (spinning) return;
    if (balance < spinCost) {
      alert("Saldo tidak cukup untuk melakukan spin.");
      return;
    }
    spinning = true;
    updateBalance(-spinCost);
    spinCount++;
    jackpotSpinCount++;
  
    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");
    const result = document.getElementById("result");
    result.innerText = "Semoga Beruntung";
    let spins = 3;
  
    function animateSpin(slot, delay) {
      setTimeout(() => {
        const interval = setInterval(() => {
          slot.innerText = getRandomSymbol();
        }, 100);
        setTimeout(() => {
          clearInterval(interval);
          slot.innerText = getRandomSymbol();
          spins--;
          if (spins === 0) {
            determineResult();
            spinning = false;
            if (autoSpinCount > 0) {
              autoSpinCount--;
              if (autoSpinCount > 0) {
                setTimeout(spin, 500);
              }
            }
          }
        }, 1000);
      }, delay);
    }
  
    function determineResult() {
      let symbol1 = slot1.innerText;
      let symbol2 = slot2.innerText;
      let symbol3 = slot3.innerText;
  
      let winAmount = 0;
      const jackpotChance = 0.10; // Misalnya : 0.00 = 0% Jackpot / 0.05 = 5% jackpot / 0.10 = 10% jackpot
  
      if (Math.random() < jackpotChance) {
        symbol1 = symbol2 = symbol3 = "🍑";
        winAmount = values["🍑"] + 5000;
        result.innerText = `Jackpot! Anda mendapatkan tambahan Rp 5.000!`;
        jackpotSpinCount = 0;
      } else {
        if (symbol1 === symbol2 && symbol2 === symbol3) {
          winAmount = values[symbol1] * 3;
        } else if (
          symbol1 === symbol2 ||
          symbol2 === symbol3 ||
          symbol1 === symbol3
        ) {
          if (symbol1 === symbol2) winAmount += values[symbol1] * 2;
          if (symbol2 === symbol3) winAmount += values[symbol2] * 2;
          if (symbol1 === symbol3) winAmount += values[symbol1] * 2;
        }
  
        if (winAmount > 0) {
          result.innerText = `Anda Menang Rp ${winAmount.toLocaleString()}`;
        } else {
          result.innerText = "Coba Lagi!";
        }
      }
      updateBalance(winAmount);
    }
  
    animateSpin(slot1, 0);
    animateSpin(slot2, 200);
    animateSpin(slot3, 400);
  }
  
  // Fungsi untuk deposit
  function deposit() {
    const depositAmount = parseInt(prompt("Masukkan jumlah deposit:"));
    if (!isNaN(depositAmount) && depositAmount > 0) {
      updateBalance(depositAmount);
    } else {
      alert("Jumlah deposit tidak valid.");
    }
  }
  
  // Fungsi untuk withdraw
  function withdraw() {
    const withdrawAmount = parseInt(prompt("Masukkan jumlah withdraw:"));
    if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= balance) {
      updateBalance(-withdrawAmount);
    } else {
      alert("Jumlah withdraw tidak valid atau saldo tidak mencukupi.");
    }
  }
  
  // Fungsi untuk memulai auto-spin
  function startAutoSpin(spins) {
    autoSpinCount = spins;
    spin();
  }
  
