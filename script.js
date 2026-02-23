document.addEventListener("DOMContentLoaded", () => {
    const scene = document.getElementById("scene");
    const card = document.getElementById("card");

    // 設定
    const maxTilt = 15; // 最大傾斜角度（度）

    // マウス・タッチの移動イベントハンドラ
    function handleMove(e) {
        // マウスイベントとタッチイベントの座標取得を統一
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // 画面の中心を取得
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // 中心からの距離を計算 ( -1 から 1 の範囲に正規化 )
        // 感度を調整したい場合は分母の数値を変更してください
        const posX = (clientX - centerX) / (window.innerWidth / 1.5);
        const posY = (clientY - centerY) / (window.innerHeight / 1.5);

        // 傾き角度を計算 (Y軸回転はX座標に、X軸回転はY座標に依存)
        const rotateY = posX * maxTilt;
        const rotateX = -posY * maxTilt; // 上に行くと上を向くように反転

        // 光沢（グレア）の位置を計算 (傾きと逆方向に動かすとリアル)
        const glareX = 50 + (posX * 40); // 50%を基準に移動
        const glareY = 50 + (posY * 40);

        // CSS変数を更新してスタイルに反映
        card.style.setProperty("--rotate-x", `${rotateX}deg`);
        card.style.setProperty("--rotate-y", `${rotateY}deg`);
        card.style.setProperty("--glare-x", `${glareX}%`);
        card.style.setProperty("--glare-y", `${glareY}%`);
        
        // 動かしている間はトランジションを無効化して追従性を高める
        card.style.transition = 'none';
    }

    // 操作終了時のリセットハンドラ
    function handleLeave() {
        // 元の位置（正面）に戻す
        card.style.setProperty("--rotate-x", `0deg`);
        card.style.setProperty("--rotate-y", `0deg`);
        card.style.setProperty("--glare-x", `50%`);
        card.style.setProperty("--glare-y", `50%`);
        
        // 滑に戻るようにトランジションを再有効化
        card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
    }

    // イベントリスナーの登録 (PC & スマホ)
    scene.addEventListener("mousemove", handleMove);
    scene.addEventListener("touchmove", handleMove, { passive: false }); // スマホでのスクロール防止

    scene.addEventListener("mouseleave", handleLeave);
    scene.addEventListener("touchend", handleLeave);
    scene.addEventListener("touchcancel", handleLeave);
});
