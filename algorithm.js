// 알고리즘 스터디

// 1. 모의고사
// 수포자들의 정답을 구하는 문제
// 수포자는 수학을 포기한 사람을 줄인 표현입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부
// 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.
// • 1번 수포자가 찍는 방식 : 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
// • 2번 수포자가 찍는 방식 : 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
// • 3번 수포자가 찍는 방식 : 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...
// 1번 문제부터 마지막 문제까지의 정답이 순서대로 저장된 배열 answers가 주어졌을 때 가장 많
// 은 문제를 맞힌 사람이 누구인지 배열에 담아 반환하도록 solution( ) 함수를 작성하세요.
// 제약 조건
// • 시험은 최대 10,000 문제로 구성되어 있습니다.
// • 문제의 정답은 1, 2, 3, 4, 5 중 하나입니다.
// • 가장 높은 점수를 받은 사람이 여럿이라면 반환하는 값을 오름차순으로 정렬하세요

// 입출력의 예
// answers return
// [1, 2, 3, 4, 5] [1]
// [1, 3, 2, 4, 2] [1, 2, 3]
// function solution(N, stages) {
// var answer = [];
// const challengers = Array(N).fill(0);
// const passer = Array(N).fill(0);
// const fail = [];
// for (let i = 1; i < N + 1; i++) {
//   stages.map((stage) => {
//     if (stage >= i) {
//       challengers[i - 1] += 1; // 해당 스테이지에 도전한 사용자 수
//     }
//     if (stage > i) {
//       passer[i - 1] += 1; // 해당 스테이지를 클리어한 사용자 수
//     }
//   });
// }
// // 실패율 계산 (스테이지 번호, 실패율)
// for (let i = 0; i < N; i++) {
//   const failureRate = challengers[i] > 0 ? (challengers[i] - passer[i]) / challengers[i] : 0;
//   fail.push([i + 1, failureRate]); // [스테이지 번호, 실패율] 형태로 저장
// }
// // 실패율을 기준으로 내림차순 정렬, 실패율이 같으면 스테이지 번호 오름차순
// fail.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
// // 정렬된 스테이지 번호만 추출
// answer = fail.map((item) => item[0]);
// return answer;
// 각 스테이지별 도전 상황에 있는 사람들의 배열을 생성한다
// N+2의 이유는, N의 값이 1부터 시작하고 도전자는 stage + 1의 값을 항상 가지기 때문에 앞 뒤에 하나의 인덱스만큼 더 추가하였다.
// const challenger = new Array(N + 2).fill(0);
// // stage의 각 값이 곧 현재 도전 상태에 있는 스테이지라는 의미기 때문에 앞에서 생성한 값에 일치하는 값 만큼 더해주는 과정을 거친다.
// for (const stage of stages) {
//   challenger[stage] += 1;
// }
// // 실패율은 객체로 다루는게 편하다, 각 스테이지가 키값이 되며 밸류가 실패율이 되면 이중 배열보다 더 간편하게 다룰 수 있게 된다.
// const fail = {};
// // 게임에 참여한 총 유저
// let totalUser = stages.length;
// for (let i = 1; i <= N; i++) {
//   // 도전자가 0이라면 0을 리턴한 뒤, 바로 다음 반복문을 돌리기 위해 continue를 사용
//   if (challenger[i] === 0) {
//     fail[i] = 0;
//     continue;
//   }
//   // 실패율 계산
//   // 해당 스테이지 = [i]의 도전자 / 총 유저
//   fail[i] = challenger[i] / totalUser;
//   // 다음 스테이지를 계산히기 위해 현재 스테이지의 도전자 수 만큼 총 유저 수에서 빼낸다
//   totalUser -= challenger[i];
// }
// // 객체를 배열로 만들어, [key, value][]의 이중 배열로 구성하여, sort 메서드를 통해 정렬 기준을 각 이중배열의 value를 기준으로 내림차순 정렬하도록 설정한다.
// // 이후 map을 통해 각각의 key 값만 리턴하도록 한다.
// return Object.entries(fail)
//   .sort((a, b) => b[1] - a[1])
//   .map((item) => Number(item[0]));
// const challenger = new Array(N + 2).fill(0);
// for (const stage of stages) {
//   challenger[stage] += 1;
// }
// const stageFailure = {};
// let totalChallenger = stages.length;
// for (let i = 0; i < N + 1; i++) {
//   if (challenger[i] === 0) {
//     stageFailure[i] = 0;
//     continue;
//   }
//   stageFailure[i] = challenger[i] / totalChallenger;
//   totalChallenger -= challenger[i];
// }
// return Object.entries(stageFailure)
//   .sort((a, b) => b[1] - a[1])
//   .map((item) => Number(item[0]));
// }

// console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));

// 현재 좌표를 받아 방향대로 이동한 결과 좌표를 리턴하는 함수
function dirSwitcher(dir, currX, currY) {
  switch (dir) {
    case 'U':
      return [currX, currY + 1];
    case 'D':
      return [currX, currY - 1];
    case 'L':
      return [currX - 1, currY];
    case 'R':
      return [currX + 1, currY];
  }
}

// 다음 이동 값이 x, y -> -5 ~ 5 이내의 값인지 판별하는 함수
function isArrange(nextX, nextY) {
  return nextX >= -5 && nextX <= 5 && nextY >= -5 && nextY <= 5;
}

function solution(dirs) {
  // 초기 좌표 설정, dirs 마다 매번 바뀌어야하기 때문에 let으로 선언
  let x = 0;
  let y = 0;

  // 중복되지 않는 유니크한 값을 갖기위해 Set을 이용
  const log = new Set();

  // for ...of 문을 통해 하나의 스트링마다 반복문을 돌릴 수 있도록 함
  // string은 이터러블 객체 중 하나기 때문에 for ...of 문을 통해 한 글자씩 순회할 수 있다.
  for (const dir of dirs) {
    // 다음 좌표값을 계산
    const [nextX, nextY] = dirSwitcher(dir, x, y);

    // 다음 좌표가 허용 범위 밖이면 continue로 이후 동작은 하지않고, 다음 반복문으로 넘어가게
    if (!isArrange(nextX, nextY)) {
      continue;
    }

    // Set 구조에 from > to, to > from의 결과 값을 저장
    // 양쪽 다 저장하는 이유는, 처음 걸어본 길을 찾아야하는데, 하나만 경험해도 양쪽의 케이스를 만족하기 때문에 등록
    log.add(`${x}${y}${nextX}${nextY}`);
    log.add(`${nextX}${nextY}${x}${y}`);

    // 다음 좌표 저장
    x = nextX;
    y = nextY;
  }

  // Set 구조에 하나의 새로운 루트마다 2번씩 저장했기 때문에 반을 잘라서 리턴
  return log.size / 2;
}

console.log(solution('ULURRDLLU'));

// 소괄호는 짝을 맞춘 열린 괄호 ‘(’와 닫힌 괄호 ‘)’로 구성합니다. 문제에서는 열린 괄호나 닫힌 괄
// 호가 마구 뒤섞인 문자열을 줍니다. 이때 소괄호가 정상으로 열고 닫혔는지 판별하는 solution( )
// 함수를 구현하세요. 만약 소괄호가 정상적으로 열고 닫혔다면 true를, 그렇지 않다면 false를 반
// 환하면 됩니다.
// 제약 조건
// • 열린 괄호는 자신과 가장 가까운 닫힌 괄호를 만나면 상쇄됩니다.
// • 상쇄 조건은 열린 괄호가 먼저 와야 하고, 열린 괄호와 닫힌 괄호 사이에 아무것도 없어야 합
// 니다.
// • 더 상쇄할 괄호가 없을 때까지 상쇄를 반복합니다.
// 입출력의 예
// s 반환값
// ( ( ) ) ( ) True

function solution2(strings) {
  // 괄호를 여는 값을 저장할 스택
  const stack = [];

  for (const string of strings) {
    switch (string) {
      case '(':
        stack.push('(');
        break;
      case ')':
        if (stack.length > 0) {
          stack.pop();
        }
    }
  }

  return stack.length < 1;
}

console.log(solution2('((())()'));

function solution3(decimal) {
  const stack = [];

  while (decimal > 0) {
    stack.push(decimal % 2);
    decimal = Math.floor(decimal / 2);
  }

  return stack.reverse().join('');
}

console.log(solution3(10));

function solution(s) {
  let answer = 0;
  const rotate = s.length;

  for (let i = 0; i < s.length; i++) {
    const stack = [];
    let isMatched = true;

    for (let j = 0; j < rotate; j++) {
      const curr = s[(i + j) % rotate];

      if (curr === '[' || curr === '{' || curr === '(') {
        stack.push(curr);
      } else {
        if (stack.length === 0) {
          isMatched = false;
          break;
        }

        const top = stack[stack.length - 1];

        if (curr === '[' && top === ']') {
          stack.pop();
        } else if (curr === '{' && top === '}') {
          stack.pop();
        } else if (curr === '[' && top === ']') {
          stack.pop();
        } else {
          isMatched = false;
          break;
        }
      }
    }

    if (stack.length === 0 && isMatched) {
      answer += 1;
    }
  }

  return answer;
}
