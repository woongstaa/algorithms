function twoInt(arr, target) {
  const hashTable = countSort(arr, target);

  for (num of arr) {
    const comp = target - num;

    if (
      comp !== num && //
      comp >= 0 &&
      comp <= target &&
      hashTable[comp] === 1
    ) {
      return true;
    }
  }

  return false;
}

function countSort(arr, k) {
  const hashTable = new Array(k + 1).fill(0);

  for (const num of arr) {
    if (num <= k) {
      hashTable[num] = 1;
    }
  }

  return hashTable;
}

function polynomialHash(str) {
  const p = 31;
  const m = 1_000_000_007;

  let hashValue = 0;

  for (let i = 0; i < str.length; i++) {
    hashValue = (hashValue * p + str.charCodeAt(i)) % m;
  }

  return hashValue;
}

function charHash(stringList, queryList) {
  const hashList = stringList.map((str) => polynomialHash(str));

  const result = [];

  for (const query of queryList) {
    const queryHash = polynomialHash(query);

    if (hashList.includes(queryHash)) {
      result.push(true);
    } else {
      result.push(false);
    }
  }

  return result;
}

function isShallowEqual(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (const key of obj1Keys) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 !== val2) {
      return false;
    }
  }

  return true;
}

function discountEvent(want, number, discount) {
  const my = {};

  for (let i = 0; i < want.length; i++) {
    my[want[i]] = number[i];
  }

  let answer = 0;

  for (let i = 0; i < discount.length - 9; i++) {
    const discount10days = {};

    for (let j = i; j < i + 10; j++) {
      if (my[discount[j]]) {
        discount10days[discount[j]] = (discount10days[discount[j]] || 0) + 1;
      }
    }

    if (isShallowEqual(my, discount10days)) {
      answer += 1;
    }
  }

  return answer;
}

function openChat(record) {
  const answer = [];
  const uid = {};

  for (const r of record) {
    const command = r.split(' ');

    if (command[0] !== 'Leave') {
      uid[command[1]] = command[2];
    }
  }

  for (const r of record) {
    const command = r.split(' ');

    if (command[0] === 'Enter') {
      answer.push(`${uid[command[1]]}님이 들어왔습니다.`);
    } else if (command[0] === 'Leave') {
      answer.push(`${uid[command[1]]}님이 나갔습니다.`);
    }
  }

  return answer;
}

// console.log(openChat(['Enter uid1234 Muzi', 'Enter uid4567 Prodo', 'Leave uid1234', 'Enter uid1234 Prodo', 'Change uid4567 Ryan']));

function bestAlbum(genres, plays) {
  const genresHash = {};
  const playsHash = {};

  for (let i = 0; i < genres.length; i++) {
    if (genresHash[genres[i]]) {
      genresHash[genres[i]] = genresHash[genres[i]] + plays[i];
    } else {
      genresHash[genres[i]] = plays[i];
    }
  }

  for (let i = 0; i < plays.length; i++) {
    if (!playsHash[genres[i]]) {
      playsHash[genres[i]] = [];
    }

    playsHash[genres[i]].push([i, plays[i]]);
  }

  const sortedGenresHash = Object.keys(genresHash).sort((a, b) => genresHash[b] - genresHash[a]);

  const answer = [];

  for (const genre of sortedGenresHash) {
    const sortedPlaysHash = playsHash[genre].sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : b[1] - a[1]));

    answer.push(...sortedPlaysHash.slice(0, 2).map(([index]) => index));
  }

  return answer;
}

// console.log('BEST_ALBUM :::', bestAlbum(['classic', 'pop', 'classic', 'classic', 'pop'], [500, 600, 150, 800, 2500]));

function reportResult(ids, reports, k) {
  const history = {};
  const count = {};
  const answer = new Array(ids.length).fill(0);

  for (const id of ids) {
    history[id] = [];
    count[id] = 0;
  }

  for (const report of reports) {
    const [from, to] = report.split(' ');

    if (!history[from].includes(to)) {
      history[from].push(to);
      count[to]++;
    }
  }

  for (let i = 0; i < ids.length; i++) {
    const target = ids[i];

    for (item of history[target]) {
      if (count[item] >= k) {
        answer[i]++;
      }
    }
  }

  return answer;
}

// console.log('REPORT_RESULT :::', reportResult(['muzi', 'frodo', 'apeach', 'neo'], ['muzi frodo', 'apeach frodo', 'frodo neo', 'muzi neo', 'apeach muzi'], 2));

function combinations(arr, n) {
  // n이 1이면, 들어온 배열의 각각의 요소를 리턴 [b, c] => [[b], [c]]
  if (n === 1) {
    return arr.map((v) => [v]);
  }

  const result = [];

  // 이 함수를 통해 n이 1이 될때까지 조합을 재귀로 만들어 결과 값에 푸시
  arr.forEach((fixed, idx, arr) => {
    // 남은 값은
    const rest = arr.slice(idx + 1);
    const combis = combinations(rest, n - 1);
    const combine = combis.map((v) => [fixed, ...v]);
    result.push(...combine);
  });

  return result;
}

function renewalMenu(orders, course) {
  const answer = [];

  for (const c of course) {
    const menu = [];
    for (const order of orders) {
      const orderArr = order.split('').sort();

      const comb = combinations(orderArr, c);

      menu.push(...comb);
    }

    const counter = {};
    for (const m of menu) {
      const key = m.join('');
      counter[key] = (counter[key] || 0) + 1;
    }

    const max = Math.max(...Object.values(counter));
    if (max > 1) {
      for (const [key, value] of Object.entries(counter)) {
        if (value === max) {
          answer.push(key);
        }
      }
    }
  }

  return answer.sort();
}

// renewalMenu(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]);

function failurePlayer(participant, completion) {
  const playerHash = {};

  for (const p of participant) {
    playerHash[p] = (playerHash[p] || 0) + 1;
  }

  for (const c of completion) {
    playerHash[c]--;
  }

  for (const key in playerHash) {
    if (playerHash[key] > 0) {
      return key;
    }
  }

  // for (const [key, value] of Object.entries(playerHash)) {
  //   if (value > 0) {
  //     return key;
  //   }
  // }
}

// failurePlayer(['leo', 'kiki', 'eden'], ['eden', 'kiki']);

function objectIsEqual(obj1, obj2) {
  if (obj1.length !== obj2.length) return false;

  for (key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function martDiscount(want, number, discount) {
  const wantHash = {};

  for (let i = 0; i < want.length; i++) {
    wantHash[want[i]] = number[i];
  }

  let answer = 0;
  for (let i = 0; i < discount.length - 9; i++) {
    const discount10days = {};

    for (let j = i; j < i + 10; j++) {
      discount10days[discount[j]] = (discount10days[discount[j]] || 0) + 1;
    }

    if (objectIsEqual(wantHash, discount10days)) {
      answer++;
    }
  }

  return answer;
}

// martDiscount(['banana', 'apple', 'rice', 'pork', 'pot'], [3, 2, 2, 2, 1], ['chicken', 'apple', 'apple', 'banana', 'rice', 'apple', 'pork', 'banana', 'pork', 'rice', 'pot', 'banana', 'apple', 'banana']);

function openChat2(record) {
  const user = {};
  const answer = [];

  for (const r of record) {
    const message = r.split(' ');

    if (message[0] !== 'Leave') {
      user[message[1]] = message[2];
    }
  }

  for (const r of record) {
    const message = r.split(' ');

    if (message[0] === 'Enter') {
      answer.push(`${user[message[1]]}님이 들어왔습니다.`);
    } else if (message[0] === 'Leave') {
      answer.push(`${user[message[1]]}님이 나갔습니다.`);
    }
  }

  return answer;
}

// openChat2(['Enter uid1234 Muzi', 'Enter uid4567 Prodo', 'Leave uid1234', 'Enter uid1234 Prodo', 'Change uid4567 Ryan']);

function reportResult2(ids, report, k) {
  const answer = [];
  const reported = {};
  const needRequest = {};

  for (const r of report) {
    const command = r.split(' ');

    if (!reported[command[1]]) {
      reported[command[1]] = new Set();
    }
    reported[command[1]].add(command[0]);
  }

  for (const id in reported) {
    if (reported[id].size >= k) {
      for (uid of reported[id]) {
        needRequest[uid] = (needRequest[uid] || 0) + 1;
      }
    }
  }

  for (id of ids) {
    if (needRequest[id]) {
      answer.push(needRequest[id]);
    } else {
      answer.push(0);
    }
  }

  return answer;
}

// reportResult2(['muzi', 'frodo', 'apeach', 'neo'], ['muzi frodo', 'apeach frodo', 'frodo neo', 'muzi neo', 'apeach muzi'], 2);

function combinePair(arr, n) {
  if (n === 1) {
    return arr.map((v) => [v]);
  }

  const result = [];

  arr.forEach((fixed, idx, arr) => {
    const rest = arr.slice(idx + 1);
    const comb = combinePair(rest, n - 1);
    result.push(...comb.map((v) => [fixed, ...v]));
  });

  return result;
}
function renewalMenu2(orders, course) {
  for (const order of orders) {
    const singleMenu = order.split('');
  }
}

renewalMenu2(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]);
combinePair(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], 3);
