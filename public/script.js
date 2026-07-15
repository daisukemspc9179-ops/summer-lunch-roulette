const lunches = [
  { name: 'おにぎりプレート', icon: '🍙', time: '10分', level: 'ひとりでできる', steps: ['ごはんに好きな具を入れる', 'ラップでにぎる', 'のりとおかずをそえる'], safety: '熱いごはんは、少し冷ましてからにぎろう。' },
  { name: 'くるくるサンド', icon: '🥪', time: '8分', level: 'ひとりでできる', steps: ['パンにマヨネーズをぬる', 'ハムやチーズをのせる', 'くるくる巻いてラップで包む'], safety: '具はおうちにあるものでOK！' },
  { name: '冷やしうどん', icon: '🍜', time: '12分', level: '大人といっしょ', steps: ['うどんを温めて水で冷やす', 'きゅうりやツナをのせる', 'めんつゆをかける'], safety: 'お湯と包丁は、必ず大人にお願いしよう。' },
  { name: 'のっけるだけ丼', icon: '🍚', time: '7分', level: 'ひとりでできる', steps: ['ごはんをどんぶりに入れる', 'ツナ・コーン・のりをのせる', 'しょうゆを少しかける'], safety: 'しょうゆは少しずつかけよう。' },
  { name: 'ピザトースト', icon: '🍕', time: '10分', level: '大人といっしょ', steps: ['パンにケチャップをぬる', 'コーンとチーズをのせる', 'トースターで焼く'], safety: '熱いトースターは、大人といっしょに使おう。' },
  { name: 'ツナマヨそうめん', icon: '🥢', time: '12分', level: '大人といっしょ', steps: ['そうめんをゆでて冷やす', 'ツナとマヨネーズを混ぜる', 'そうめんにのせてつゆをかける'], safety: 'ゆでるところは、大人にお願いしよう。' },
  { name: 'コーンフレークごはん', icon: '🥣', time: '3分', level: 'ひとりでできる', steps: ['器にコーンフレークを入れる', 'バナナを手でちぎってのせる', '牛乳やヨーグルトを入れる'], safety: '牛乳は冷蔵庫にすぐ戻そう。' },
  { name: 'たまごかけごはん', icon: '🥚', time: '5分', level: 'ひとりでできる', steps: ['ごはんを器に入れる', 'たまごを割ってのせる', 'しょうゆを少しかけて混ぜる'], safety: '新鮮なたまごを使い、殻が入っていないか見よう。' },
  { name: 'レンジで焼きそば', icon: '🍝', time: '10分', level: '大人といっしょ', steps: ['耐熱皿に麺とカット野菜を入れる', '表示どおりレンジで温める', 'ソースを混ぜる'], safety: '熱いお皿と湯気に注意。大人と取り出そう。' },
  { name: 'ハムチーズラップ', icon: '🌯', time: '6分', level: 'ひとりでできる', steps: ['トルティーヤにレタスをのせる', 'ハムとチーズをのせる', '両はしをたたんで巻く'], safety: 'つまようじは使わず、ラップで包もう。' },
  { name: 'お茶づけ', icon: '🍵', time: '5分', level: '大人といっしょ', steps: ['ごはんを器に入れる', 'お茶づけのもとをかける', 'お湯をゆっくり注ぐ'], safety: '熱いお湯は、大人に注いでもらおう。' },
  { name: 'フルーツサンド', icon: '🍓', time: '10分', level: 'ひとりでできる', steps: ['パンにクリームをぬる', 'カットフルーツを並べる', 'パンではさんでラップで包む'], safety: '包丁を使うフルーツは、大人に切ってもらおう。' }
];

// ルーレット内は、細いマスでも読みやすい短い名前にする。
// 結果カードには上の正式なメニュー名を表示する。
const wheelNames = ['おにぎり', 'サンド', 'うどん', 'のっけ丼', 'ピザ', 'そうめん', 'シリアル', 'たまごご飯', '焼きそば', 'ラップサンド', 'お茶づけ', 'フルーツサンド'];

const wheel = document.querySelector('#wheel');
const labels = document.querySelector('#wheelLabels');
const wheelCenter = document.querySelector('.wheel-center');
const spinButton = document.querySelector('#spinButton');
const resultEmpty = document.querySelector('#resultEmpty');
const resultContent = document.querySelector('#resultContent');
let rotation = 0;
let spinning = false;

lunches.forEach((lunch, index) => {
  const label = document.createElement('span');
  label.className = 'wheel-label';
  const angle = -90 + index * 30;
  label.style.transform = `rotate(${angle}deg) translateY(-50%)`;
  label.dataset.angle = angle;
  label.innerHTML = `<span class="wheel-label-content" style="transform:translateY(-50%) rotate(${-angle}deg)"><i>${lunch.icon}</i><b>${wheelNames[index]}</b></span>`;
  labels.appendChild(label);
});

function showResult(index) {
  const lunch = lunches[index];
  document.querySelector('#foodIcon').textContent = lunch.icon;
  document.querySelector('#foodName').textContent = lunch.name;
  document.querySelector('#timeTag').textContent = `⏱ ${lunch.time}`;
  document.querySelector('#levelTag').textContent = lunch.level === 'ひとりでできる' ? '◎ ひとりでOK' : '△ 大人といっしょ';
  document.querySelector('#safetyNote').textContent = lunch.safety;
  const steps = document.querySelector('#recipeSteps');
  steps.replaceChildren(...lunch.steps.map(text => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  }));
  resultEmpty.hidden = true;
  resultContent.hidden = false;
  resultContent.classList.remove('pop');
  requestAnimationFrame(() => resultContent.classList.add('pop'));
}

spinButton.addEventListener('click', () => {
  if (spinning) return;
  spinning = true;
  spinButton.disabled = true;
  spinButton.querySelector('span:nth-child(2)').textContent = 'ぐるぐる…';
  const selected = Math.floor(Math.random() * lunches.length);
  const currentNormalized = ((rotation % 360) + 360) % 360;
  const targetNormalized = (360 - selected * 30) % 360;
  const adjustment = (targetNormalized - currentNormalized + 360) % 360;
  rotation += 1440 + adjustment;
  wheel.style.transform = `rotate(${rotation}deg)`;
  document.querySelectorAll('.wheel-label').forEach(label => {
    const labelAngle = Number(label.dataset.angle);
    label.querySelector('.wheel-label-content').style.transform = `translateY(-50%) rotate(${-labelAngle - rotation}deg)`;
  });
  wheelCenter.style.transform = `translate(-50%, -50%) rotate(${-rotation}deg)`;

  // 見た目の停止位置から当たり番号を計算することで、
  // 矢印と結果カードがずれないようにする。
  let resultShown = false;
  const finishSpin = () => {
    if (resultShown) return;
    resultShown = true;
    const stoppedAt = ((rotation % 360) + 360) % 360;
    const landedIndex = Math.round(((360 - stoppedAt) % 360) / 30) % lunches.length;
    showResult(landedIndex);
    spinButton.disabled = false;
    spinButton.querySelector('span:nth-child(2)').textContent = 'もう一度回す！';
    spinning = false;
  };

  wheel.addEventListener('transitionend', finishSpin, { once: true });
  window.setTimeout(finishSpin, 4700);
});
