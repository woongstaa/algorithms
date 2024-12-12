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

console.log('BEST_ALBUM :::', bestAlbum(['classic', 'pop', 'classic', 'classic', 'pop'], [500, 600, 150, 800, 2500]));
