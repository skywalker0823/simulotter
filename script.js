let total_cost = 0;
let first_prize = 0;
let second_prize = 0;
let third_prize = 0;


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start_up").value = 1000;
  document.getElementById("one_time_throw").value = 1;
  numbers = generator();
  render_random(numbers);
});
start_simulate = () => {
  let type = document.getElementById("play_type").value;
  let total_coin = document.getElementById("start_up").value;
  let grand_prize = false;
  let sec1 = [];
  let sec2 = [];
  let time = moment().format("YYYY-MM-DD");
  let weekday = moment().format("dddd");

  //抓取自選sec1
  sec1.push(parseInt(document.getElementById("po_1").value));
  sec1.push(parseInt(document.getElementById("po_2").value));
  sec1.push(parseInt(document.getElementById("po_3").value));
  sec1.push(parseInt(document.getElementById("po_4").value));
  sec1.push(parseInt(document.getElementById("po_5").value));
  sec1.push(parseInt(document.getElementById("po_6").value));

  //抓取自選sec2特別號
  sec2 = parseInt(document.getElementById("po_sp").value);

  //購入頻率
  let freq = document.getElementById("freq").value;

  //單次投資
  let once = document.getElementById("one_time_throw").value;

  if (once * 100 > total_coin) {
    console.log("總金額不得大於總資金", once, total_coin);
    return;
  }

  let range_counter = 0;
  while (total_coin >= once * 100 && !grand_prize) {
    //電腦選號容器(可能多組)
    //[[[1,2,3,4,5,6],[5]],[[3,5,23,4,8,10],[1]],[]...]
    let challenge_list = [];
    //開獎容器(1組)
    let prime_sec1 = [];
    let prime_sec2 = [];

    //扣除單次金額(自選+電選)
    total_coin -= once * 100;
    total_cost += once * 100;
    //將自選號碼裝入 sec1:[11,22,33,44,32,12]
    challenge_list.push([sec1, sec2]);

    //將自選的特別號裝入
    //將購入的電選號碼裝入
    if (once != 1) {
      challenge_list.push([generator(), generateRandomInteger(8)]);
    }

    //此次開獎號碼
    //第一區開獎號碼
    prime_sec1 = generator();
    //第二區開獎號碼
    prime_sec2 = generateRandomInteger(8);
    //對獎程序&統計中獎狀態
    //導入產生亂碼，生成一個比對一個
    for (a_set of challenge_list) {
      //先做出以中頭獎為主
      if (a_set[1] != prime_sec2) {
        //特別號沒中，開始過濾小獎可能性
        continue;
      }
      if (!prime_sec1.includes(a_set[0][0])) {
        continue;
      }
      if (!prime_sec1.includes(a_set[0][1])) {
        continue;
      }
      if (!prime_sec1.includes(a_set[0][2])) {
        continue;
      }
      if (!prime_sec1.includes(a_set[0][3])) {
        continue;
      }
      if (!prime_sec1.includes(a_set[0][4])) {
        third_prize+=1
        continue;
      }
      if (!prime_sec1.includes(a_set[0][5])) {
        second_prize+=1
        continue;
      }
      grand_prize = true;
      console.log("中頭獎拉");
      first_prize+=1
      continue

    }

    //中獎金額回資金池

    //重置號碼
    range_counter += 1;
    challenge_list = [];
  }

  console.log("結餘", "剩餘資金:", total_coin);
  document.getElementById("resulter").innerHTML =
    "剩餘資金:" +
    total_coin +
    "，每次購買" +
    once +
    "張，一共花了" +
    total_cost +
    "，頭獎次數:" +first_prize+
    "次，二獎次數:"+second_prize+"次，三獎次數:"+third_prize+"次";
};

generator = (call) => {
  let numbers = [];
  while (numbers.length != 6) {
    let new_num = generateRandomInteger(38);
    if (numbers.includes(new_num)) {
      continue;
    }
    numbers.push(new_num);
  }
  if(call=="button-addon1"){
    render_random(numbers)
    return
  }
  return numbers;
};

generateRandomInteger = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

render_random = (numbers) => {
  document.getElementById("po_1").value = "";
  document.getElementById("po_1").value = numbers[0];

  document.getElementById("po_2").value = "";
  document.getElementById("po_2").value = numbers[1];

  document.getElementById("po_3").value = "";
  document.getElementById("po_3").value = numbers[2];

  document.getElementById("po_4").value = "";
  document.getElementById("po_4").value = numbers[3];

  document.getElementById("po_5").value = "";
  document.getElementById("po_5").value = numbers[4];

  document.getElementById("po_6").value = "";
  document.getElementById("po_6").value = numbers[5];

  //特別號
  document.getElementById("po_sp").value = generateRandomInteger(8);
};
