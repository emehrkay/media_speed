
var qs = document.querySelector.bind(document),
    qsa = document.querySelectorAll.bind(document);
    existing = qsa('.video_speed_cover, .video_speed_container');

if(existing.length){
    existing.forEach(el => el.remove());
}

var ce = document.createElement.bind(document),
    media = qsa('video,audio'),
    active = null,
    body = qs('body'),
    container = ce('div'),
    select = ce('select'),
    range = ce('input'),
    rate = ce('span'),
    cover = ce('div'),
    b_half = ce('a'),
    b_one = ce('a'),
    b_two = ce('a'),
    b_three = ce('a'),
    b_beg = ce('a'),
    b_end = ce('a'),
    buttons = ce('div');

var choose = ce('option');
choose.text = 'choose media';
select.appendChild(choose);

for(var i = 0; i < media.length; i++){
    var o = ce('option');
    o.value = i;
    var l = media[i].nodeName == 'VIDEO' ? 'video' : 'audio'
    o.text = `${l}: ${i + 1}`;
    select.appendChild(o)
}

select.onchange = function(){
    var v = this.value;
    if(v){
        setVideo(media[v]);
    }
};

var update = function(speed){
    if(!active){
        return;
    }

    active.playbackRate = speed;
    rate.innerHTML = speed;
};

var setVideo = function(v){
    active = v;
    update(v.playbackRate);
};

range.oninput = function(){
    update(range.value);
};

cover.onclick = function(){
    cover.remove();
    container.remove();
};

if(media.length){
    setVideo(media[0]);
    select.value = 0;
    range.value = media[0].playbackRate;
}

b_half.onclick = function(e){
    e.preventDefault();
    update(.5);
    range.value = .5;
}

b_one.onclick = function(e){
    e.preventDefault();
    update(1);
    range.value = 1;
}

b_two.onclick = function(e){
    e.preventDefault();
    update(2);
    range.value = 2;
}

b_three.onclick = function(e){
    e.preventDefault();
    update(3);
    range.value = 3;
}

b_beg.onclick = function(e){
    e.preventDefault();
    if(active){
        active.currentTime = 1;
    }
}

b_end.onclick = function(e){
    e.preventDefault();
    if(active){
        active.currentTime = active.duration - 1;
    }
}

buttons.appendChild(b_beg);
buttons.appendChild(b_half);
buttons.appendChild(b_one);
buttons.appendChild(b_two);
buttons.appendChild(b_three);
buttons.appendChild(b_end);
buttons.style.display = 'flex';
buttons.style.justifyContent = 'space-between';
b_half.innerHTML = '&frac12;x';
b_half.href = '#';
b_one.innerHTML = '1x';
b_one.href = '#';
b_two.innerHTML = '2x';
b_two.href = '#';
b_three.innerHTML = '3x';
b_three.href = '#';
b_beg.innerHTML = '<<';
b_beg.href = '#';
b_end.innerHTML = '>>';
b_end.href = '#';
range.type = 'range';
range.min = '.25';
range.max = '10';
range.step = '.25';
select.style.display = 'inline-block';
range.style.display = 'block';
rate.style.display = 'inline-block';
container.style.position = 'fixed';
container.style.top = '1%';
container.style.right = '1%';
container.style.zIndex = '1000000';
container.style.background = 'red';
container.style.borderRadius = '6px';
container.style.padding = '10px';
container.style.textAlign = 'center';
container.classList.add('video_speed_container');
cover.style.position = 'fixed';
cover.style.top = 0;
cover.style.right = 0;
cover.style.bottom = 0;
cover.style.left = 0;
cover.classList.add('video_speed_cover');
container.appendChild(select);
container.appendChild(range);
container.appendChild(buttons);
container.appendChild(rate);
body.appendChild(cover);
body.appendChild(container);
