document.addEventListener('DOMContentLoaded', () => {
    const text = '生日快樂！';
    const birthdayText = document.getElementById('birthday-text');
    birthdayText.innerHTML = '';

    // 逐字動畫顯示
    text.split('').forEach((char, idx) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(30px) scale(0.8)';
        span.style.transition = 'all 0.5s cubic-bezier(.68,-0.55,.27,1.55)';
        birthdayText.appendChild(span);
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0) scale(1.1)';
        }, 200 + idx * 180);
        setTimeout(() => {
            span.style.transform = 'translateY(0) scale(1)';
        }, 500 + idx * 180);
    });

    // 祝福語打字機動畫
    const wish = document.getElementById('wish');
    if (wish) {
        const wishText = wish.textContent;
        wish.textContent = '';
        wish.style.opacity = 1;
        let i = 0;
        function typeWish() {
            if (i <= wishText.length) {
                wish.textContent = wishText.slice(0, i);
                i++;
                setTimeout(typeWish, 80 + Math.random() * 60);
            }
        }
        setTimeout(typeWish, 1200);
    }

    // 蠟燭火焰閃爍動畫
    const flame = document.getElementById('candle-flame');
    if (flame) {
        setInterval(() => {
            const scale = 0.9 + Math.random() * 0.3;
            const dy = -1 + Math.random() * 2;
            flame.setAttribute('transform', `scale(1,${scale}) translate(0,${dy})`);
            flame.setAttribute('fill', Math.random() > 0.5 ? '#ffe066' : '#ffd166');
        }, 180);
    }

    // 星星/愛心粒子動畫（升級：旋轉、縮放、透明度）
    const particleContainer = document.getElementById('particles');
    const particleTypes = ['✨', '⭐', '💖', '🎉', '🌟'];
    function createParticle() {
        const p = document.createElement('span');
        p.className = 'particle';
        p.textContent = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        const size = 18 + Math.random() * 18;
        p.style.fontSize = size + 'px';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '-40px';
        p.style.opacity = 0.7 + Math.random() * 0.3;
        const rotate = Math.random() * 360;
        const scale = 0.7 + Math.random() * 0.7;
        p.style.transform = `rotate(${rotate}deg) scale(${scale})`;
        particleContainer.appendChild(p);
        // 動畫
        const duration = 3.5 + Math.random() * 2.5;
        const translateX = (Math.random() - 0.5) * 60;
        p.animate([
            { transform: `rotate(${rotate}deg) scale(${scale}) translateY(0) translateX(0)`, opacity: p.style.opacity },
            { transform: `rotate(${rotate + 180}deg) scale(${scale * 1.1}) translateY(90vh) translateX(${translateX}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'ease-in',
            fill: 'forwards'
        });
        setTimeout(() => {
            p.remove();
        }, duration * 1000);
    }
    setInterval(createParticle, 320);

    // 分享按鈕
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const shareData = {
                title: '生日快樂！',
                url: window.location.href
            };
            if (navigator.share) {
                navigator.share(shareData).catch(() => {});
            } else {
                // 備用：複製網址
                navigator.clipboard.writeText(window.location.href);
                shareBtn.textContent = '已複製連結！';
                setTimeout(() => shareBtn.textContent = '🎁 分享祝福', 1500);
            }
        });
    }

    // 金色微粒閃爍
    const goldDust = document.getElementById('goldDust');
    if (goldDust) {
        for (let i = 0; i < 36; i++) {
            const dot = document.createElement('div');
            dot.className = 'gold-dot';
            dot.style.left = Math.random() * 100 + 'vw';
            dot.style.top = Math.random() * 100 + 'vh';
            dot.style.animationDelay = (Math.random() * 3.5) + 's';
            goldDust.appendChild(dot);
        }
    }

    // 蛋糕點擊灑糖動畫
    const cake = document.getElementById('cake');
    if (cake) {
        cake.addEventListener('click', () => {
            for (let i = 0; i < 18; i++) {
                const sprinkle = document.createElement('span');
                sprinkle.className = 'particle';
                sprinkle.textContent = ['🍬','🍭','🍫','✨','⭐','💖'][Math.floor(Math.random()*6)];
                const size = 16 + Math.random() * 10;
                sprinkle.style.fontSize = size + 'px';
                sprinkle.style.left = (cake.offsetLeft + cake.offsetWidth/2 + (Math.random()-0.5)*40) + 'px';
                sprinkle.style.top = (cake.offsetTop + 10) + 'px';
                sprinkle.style.opacity = 0.8 + Math.random() * 0.2;
                sprinkle.style.zIndex = 20;
                document.body.appendChild(sprinkle);
                // 噴灑動畫
                const angle = -80 + Math.random()*160;
                const distance = 60 + Math.random()*40;
                const dx = Math.cos(angle*Math.PI/180) * distance;
                const dy = Math.sin(angle*Math.PI/180) * distance;
                sprinkle.animate([
                    { transform: 'translate(0,0) scale(1)', opacity: 1 },
                    { transform: `translate(${dx}px,${dy}px) scale(1.2)`, opacity: 0.2 }
                ], {
                    duration: 900 + Math.random()*400,
                    easing: 'cubic-bezier(.68,-0.55,.27,1.55)',
                    fill: 'forwards'
                });
                setTimeout(() => sprinkle.remove(), 1200);
            }
        });
    }

    // === 滑動螢幕有金色粒子跟隨手指移動 ===
    function spawnGoldParticle(x, y) {
        const p = document.createElement('span');
        p.className = 'particle';
        p.textContent = '✨';
        p.style.position = 'fixed';
        p.style.left = (x - 8) + 'px';
        p.style.top = (y - 8) + 'px';
        p.style.fontSize = (14 + Math.random()*8) + 'px';
        p.style.color = '#ffd700';
        p.style.opacity = 0.85;
        p.style.pointerEvents = 'none';
        p.style.zIndex = 99;
        document.body.appendChild(p);
        p.animate([
            { opacity: 0.85, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(1.7) translateY(-18px)' }
        ], {
            duration: 700,
            fill: 'forwards'
        });
        setTimeout(() => p.remove(), 700);
    }
    ['touchmove','mousemove'].forEach(evt => {
        window.addEventListener(evt, e => {
            let x, y;
            if (e.touches && e.touches.length) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }
            spawnGoldParticle(x, y);
        });
    });

    // === 長按卡片顯示/隱藏祝福語 ===
    const card = document.querySelector('.container.glass-card');
    let longPressTimer = null;
    if (card && wish) {
        card.addEventListener('touchstart', e => {
            longPressTimer = setTimeout(() => {
                wish.style.display = (wish.style.display === 'none') ? '' : 'none';
            }, 650);
        });
        card.addEventListener('touchend', e => {
            clearTimeout(longPressTimer);
        });
        card.addEventListener('mousedown', e => {
            longPressTimer = setTimeout(() => {
                wish.style.display = (wish.style.display === 'none') ? '' : 'none';
            }, 650);
        });
        card.addEventListener('mouseup', e => {
            clearTimeout(longPressTimer);
        });
    }

    // === 卡片隨手機偏轉而偏轉 ===
    if (window.DeviceOrientationEvent && card) {
        window.addEventListener('deviceorientation', function(event) {
            // gamma: 左右, beta: 前後
            const maxTilt = 18;
            const rotateY = Math.max(Math.min(event.gamma, maxTilt), -maxTilt);
            const rotateX = Math.max(Math.min(event.beta - 45, maxTilt), -maxTilt);
            card.style.transform = `rotateY(${-rotateY}deg) rotateX(${rotateX}deg)`;
        });
    }
}); 
