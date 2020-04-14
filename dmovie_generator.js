'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('confirm');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
// TODO 別ファイルに出したい
const answers = [
    '{username}におすすめなのは「リトル・マーメイド」です',
    '{username}におすすめなのは「アラジン」です',
    '{username}におすすめなのは「美女と野獣」です',
    '{username}におすすめなのは「チキン・リトル」です',
    '{username}におすすめなのは「ピーターパン」です',
    '{username}におすすめなのは「ノートルダムの鐘」です',
    '{username}におすすめなのは「アナと雪の女王」です',
    '{username}におすすめなのは「塔の上のラプンツェル」です',
    '{username}におすすめなのは「モアナと伝説の海」です',
    '{username}におすすめなのは「シュガー・ラッシュ」です',
]

/**
 * 名前の文字列と時間をもとに診断結果を返す
 * 
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function generate(userName) {
    // ユーザー名から数値を算出(各文字コード番号の合計)
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 現在時刻をエポック秒に変換
    const nowDate = new Date();
    const truncatedDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate(), nowDate.getHours(), 0, 0, 0);
    const epocTime = Math.floor(truncatedDate.getTime() / 1000);

    // ユーザー名の数値と時間数値を足す
    sumOfCharCode = sumOfCharCode + epocTime;

    // 合計を結果パターン数で割って添字の数値を求める
    // TODO: 作品数のランダムにしたい
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{username\}/g, userName);
    return result;
}

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = generate(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('ディズニー映画') +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #ディズニー映画';
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

};

